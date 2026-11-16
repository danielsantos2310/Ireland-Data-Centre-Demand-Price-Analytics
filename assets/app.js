
(() => {
  const $ = s => document.querySelector(s);
  const dataEl = $("#site-data");
  const data = JSON.parse(dataEl.textContent);
  const m = data.metrics;

  const fmt = (x,d=1) => Number(x).toFixed(d);
  $("#share2025").textContent = fmt(m.annual_dc_share_2025,1) + "%";
  $("#corr").textContent = fmt(m.level_correlation,2);
  $("#dcP").textContent = fmt(m.first_difference_dc_p,2);
  $("#bestRmse").textContent = fmt(m.best_common_rmse,2);
  $("#networkJump").textContent = fmt(m.network_2024,2)+" → "+fmt(m.network_2025,2);
  $("#energyDrop").textContent = fmt(m.energy_2024,2)+" → "+fmt(m.energy_2025,2);

  const colors = {
    bg:"#07131C", text:"#F4F8FA", muted:"#9AB0BA", grid:"#233945",
    cyan:"#69D8E7", amber:"#F3B45D", mint:"#7ED8A4", coral:"#F27668",
    ink:"#0C1820", lightgrid:"#d7e1e5"
  };

  function setup(canvas){
    const r=canvas.getBoundingClientRect(), dpr=window.devicePixelRatio||1;
    canvas.width=Math.max(1,Math.floor(r.width*dpr));
    canvas.height=Math.max(1,Math.floor(r.height*dpr));
    const ctx=canvas.getContext("2d"); ctx.setTransform(dpr,0,0,dpr,0,0);
    return {ctx,w:r.width,h:r.height};
  }
  function lineChart(canvas, series, labels, opts={}){
    const {ctx,w,h}=setup(canvas), pad={l:54,r:18,t:24,b:52};
    ctx.clearRect(0,0,w,h);
    const vals=series.flatMap(s=>s.values).filter(Number.isFinite);
    let min=opts.min??Math.min(...vals), max=opts.max??Math.max(...vals);
    if(min===max){min-=1;max+=1}
    const x=i=>pad.l+i*(w-pad.l-pad.r)/(labels.length-1);
    const y=v=>h-pad.b-(v-min)*(h-pad.t-pad.b)/(max-min);
    ctx.strokeStyle=opts.light?colors.lightgrid:colors.grid;ctx.fillStyle=opts.light?"#53666e":colors.muted;
    ctx.font="12px ui-monospace, monospace";ctx.lineWidth=1;
    for(let j=0;j<5;j++){const yy=pad.t+j*(h-pad.t-pad.b)/4;ctx.beginPath();ctx.moveTo(pad.l,yy);ctx.lineTo(w-pad.r,yy);ctx.stroke();
      const v=max-j*(max-min)/4;ctx.fillText(v.toFixed(opts.decimals??0),8,yy+4);}
    labels.forEach((lab,i)=>{if(i%Math.ceil(labels.length/6)===0||i===labels.length-1){ctx.save();ctx.translate(x(i),h-18);ctx.rotate(-.55);ctx.fillText(lab,0,0);ctx.restore();}});
    series.forEach(s=>{ctx.strokeStyle=s.color;ctx.lineWidth=3;ctx.beginPath();s.values.forEach((v,i)=>{if(!Number.isFinite(v))return;const xx=x(i),yy=y(v);i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)});ctx.stroke();
      s.values.forEach((v,i)=>{if(!Number.isFinite(v))return;ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(x(i),y(v),3.5,0,Math.PI*2);ctx.fill();});
    });
    let lx=pad.l;series.forEach(s=>{ctx.fillStyle=s.color;ctx.fillRect(lx,4,13,3);ctx.fillStyle=opts.light?colors.ink:colors.text;ctx.fillText(s.name,lx+20,10);lx+=ctx.measureText(s.name).width+58;});
  }
  function barChart(canvas, rows, opts={}){
    const {ctx,w,h}=setup(canvas), pad={l:230,r:28,t:25,b:28};
    const max=Math.max(...rows.map(r=>r.value))*1.15;
    ctx.font="12px ui-monospace, monospace";
    rows.forEach((r,i)=>{
      const rh=(h-pad.t-pad.b)/rows.length, y=pad.t+i*rh+8, bh=Math.max(20,rh-16);
      ctx.fillStyle=opts.light?colors.ink:colors.text;ctx.fillText(r.label,8,y+bh/2+4);
      const bw=(w-pad.l-pad.r)*(r.value/max);
      ctx.fillStyle=r.color;ctx.beginPath();ctx.roundRect(pad.l,y,bw,bh,8);ctx.fill();
      ctx.fillStyle=opts.light?colors.ink:colors.text;ctx.fillText(r.value.toFixed(2),pad.l+bw+8,y+bh/2+4);
    });
  }

  const half=data.halfyear;
  const labels=half.map(r=>r.period);
  const dc0=half[0].data_centre_gwh, p0=half[0].electricity_c_per_kwh, g0=half[0].gas_c_per_kwh;
  function drawAll(){
    lineChart($("#indexedChart"),[
      {name:"Data-centre demand",color:colors.cyan,values:half.map(r=>r.data_centre_gwh/dc0*100)},
      {name:"Business electricity",color:colors.amber,values:half.map(r=>r.electricity_c_per_kwh/p0*100)},
      {name:"Business gas",color:colors.coral,values:half.map(r=>r.gas_c_per_kwh/g0*100)}
    ],labels,{min:70,max:700});

    const lag=data.lag_evaluation.map((r,i)=>({label:r.model,value:r.rmse,color:i===0?colors.mint:(r.model==="naive"?colors.cyan:colors.amber)}));
    barChart($("#lagChart"),lag);

    lineChart($("#networkChart"),[
      {name:"Energy & supply",color:colors.amber,values:data.network_components.map(r=>r.energy_supply_c_per_kwh)},
      {name:"Network",color:colors.cyan,values:data.network_components.map(r=>r.network_c_per_kwh)}
    ],data.network_components.map(r=>String(r.year)),{light:true,min:0,max:26,decimals:0});

    renderExposure(currentScenario);
  }

  const expByScenario={};
  data.exposure.forEach(r=>(expByScenario[r.scenario]??=[]).push(r));
  let currentScenario="Central";
  function renderExposure(name){
    currentScenario=name;
    document.querySelectorAll(".chip").forEach(b=>b.classList.toggle("active",b.dataset.scenario===name));
    const rows=expByScenario[name];
    const y2035=rows.find(r=>r.year===2035);
    $("#exposurePrice").textContent=fmt(y2035.band_ig_real_c_per_kwh,2)+" c/kWh";
    $("#exposureValue").textContent="€"+fmt(y2035.benchmark_expenditure_billion_eur,2)+"bn";
    lineChart($("#exposureChart"),[
      {name:name,color:name==="Low-cost transition"?colors.mint:(name==="Central"?colors.cyan:colors.amber),values:rows.map(r=>r.benchmark_expenditure_billion_eur)}
    ],rows.map(r=>String(r.year)),{min:1,max:3.2,decimals:1});
  }
  document.querySelectorAll(".chip").forEach(b=>b.addEventListener("click",()=>renderExposure(b.dataset.scenario)));

  let t; window.addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(drawAll,120)});
  drawAll();
})();
