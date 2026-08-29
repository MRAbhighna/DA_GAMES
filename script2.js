let siteHidden=false;
let iframeEl=null;


function hideSite(){
  if(!siteHidden){
    iframeEl=document.createElement('iframe');
    iframeEl.src = getSettings().hideUrl;
    Object.assign(iframeEl.style,{
      position:"fixed",top:"0",left:"0",width:"100%",height:"100%",
      zIndex:"99998",border:"none"
    });
    document.body.appendChild(iframeEl);

    overlay=document.createElement('div');
    Object.assign(overlay.style,{
      position:"fixed",top:"0",left:"0",width:"100%",height:"100%",
      zIndex:"99999",background:"transparent",cursor:"pointer"
    });
    overlay.onclick=()=>{ 
      iframeEl.remove(); iframeEl=null; 
      overlay.remove(); overlay=null;
      siteHidden=false;
    };
    document.body.appendChild(overlay);

    siteHidden=true;
  } else {
    if(iframeEl){iframeEl.remove();iframeEl=null;}
    if(typeof overlay!=='undefined' && overlay){overlay.remove(); overlay=null;}
    siteHidden=false;
  }
}


