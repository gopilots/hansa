document.addEventListener('DOMContentLoaded', function(){
	let trackElements = document.getElementsByClassName('track-element');
	for(let i = 0; i < trackElements.length; i++){
		trackElements[i].addEventListener("click", Reg_Event, false);
	}
	let showMenuIcon = document.getElementsByClassName('header-menu-icono')[0];
	showMenuIcon.addEventListener("click", Show_MenuR, false);
	let hideMenuElements = document.getElementsByClassName('hide-menu-element');
	for(let i = 0; i < hideMenuElements.length; i++){
		hideMenuElements[i].addEventListener("click", Hide_MenuR, false);
	}
	let closeLeadFormAlert = document.getElementsByClassName('close-leadform-alert');
	for(let i = 0; i < closeLeadFormAlert.length; i++){
		closeLeadFormAlert[i].addEventListener("click", function(){
			hidcap('dRegAlertC');
		}, false);
	}
	let closeLeadFormSend = document.getElementsByClassName('close-leadform-send');
	for(let i = 0; i < closeLeadFormSend.length; i++){
		closeLeadFormSend[i].addEventListener("click", function(){
			hidcap('dRegSucC');
		}, false);
	}
	let leadFormSubmit = document.getElementsByClassName('lead-form-submit');
	for(let i = 0; i < leadFormSubmit.length; i++){
		leadFormSubmit[i].addEventListener("click", Send_Email_Cont, false);
	}
	let leadFormCheck = document.getElementById('slSi');
	if(leadFormCheck != null){
		leadFormCheck.addEventListener("click", function(element){
			if(this.checked == true){this.value = 'Si';}else{this.value = 'No';}
		}, false);
	}
})
window.onscroll = function() {ScrollFunction()};
function ScrollFunction() {
	var dhead = document.getElementById('header');
	var dstore = document.getElementById('contienda');
	var dhotel = document.getElementById('conhotel');
	if(dhead!= null){var dhcont = dhead.getElementsByClassName('dhead-scroll');}
	if(parseInt(document.body.style.top.replace('px','')) < 0){return false;}
	if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70 ) {
		if(dhead!= null){
			for(i = 0; i <= dhcont.length-1; i++){
				if(dhcont[i] != null){
					dhcont[i].className = dhcont[i].id + ' ' + dhcont[i].id + '-scrl' + ' dhead-scroll';				
				}
			}
			dhead.className = 'header header-scroll';
		}
		//-----------------------------------------
		//Controles hoteles
		if(dhotel != null){
			var dtcont = dhotel.getElementsByClassName('conhotel-scroll');
			for(i = 0; i <= dtcont.length-1; i++){
				if(dtcont[i] != null){
					dtcont[i].className = dtcont[i].id + ' ' + dtcont[i].id + '-scrl' + ' conhotel-scroll';				
				}
			}
			dhotel.className = 'conhotel conhotel-scrl conhotel-load';
			if(getComputedStyle(dhotel, null).getPropertyValue("width") == getComputedStyle(dhead, null).getPropertyValue("width")){
				setTimeout(function(){
					dhotel.style.top=dhead.clientHeight + 'px';
				}, 500);
			}
		}
	} else {
		if(dhead!= null){
			for(i = 0; i <= dhcont.length-1; i++){
				if(dhcont[i] != null){
					dhcont[i].className = dhcont[i].id + ' dhead-scroll';				
				}
			}
			dhead.className = 'header';
		}
		//------------------------------------
		//Controles hotel
		if(dhotel != null){
			var dtcont = dhotel.getElementsByClassName('conhotel-scroll');
			for(i = 0; i <= dtcont.length-1; i++){
				if(dtcont[i] != null){
					dtcont[i].className = dtcont[i].id + ' conhotel-scroll';				
				}
			}
			dhotel.className = 'conhotel conhotel-load';
			if(getComputedStyle(dhotel, null).getPropertyValue("width") == getComputedStyle(dhead, null).getPropertyValue("width")){
				setTimeout(function(){
					dhotel.style.top=dhead.clientHeight + 'px';
				}, 500);
			}
		}
	}
}
//========================================================================
function InnerCtr(sCtr, sCont){var dcap = document.getElementById(sCtr);dcap.innerHTML = sCont;}
function hidcap(sdiv){var dobj = document.getElementById(sdiv);dobj.style.visibility = 'hidden';}
function hidcap_1(sdiv){var dobj = document.getElementsByClassName(sdiv);dobj[0].style.display = 'none';}
function hidcap_2(sdiv){var dobj = document.getElementById(sdiv);dobj.style.display = 'none';}
function viscap(sdiv){var dobj = document.getElementById(sdiv);dobj.style.visibility = 'visible';} 
function viscap_1(sdiv){var dobj = document.getElementsByClassName(sdiv);dobj[0].style.display = 'block';} 
function viscap_2(sdiv){var dobj = document.getElementById(sdiv);dobj.style.display = 'block';} 
//===========================================================================
function Reg_Event(){let sevent = this.dataset.eventid;let ssection = this.dataset.section;let stipo = this.dataset.tipo;let dval = GenConret('General', 'Reg_Event', sevent + "|" + ssection + "|" + stipo, true);}
function Reg_Event_2(sevent, ssection, stipo){var dval = GenConret('General', 'Reg_Event', sevent + "|" + ssection + "|" + stipo, true);}
function Reg_Exit(trID){var dval = GenConret('General', 'Reg_Exit', trID, true);}
//=========================================================================
function GenConret(sfile, sfunc, sparam, sasinc){
var funval = '';
var request = null;
if(window.XMLHttpRequest){
request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
request = new ActiveXObject("Microsoft.XMLHTTP");
}
if (request) {
request.open("GET", sfile + ".php?sFun=" + sfunc + "&sparam=" + sparam, sasinc);
request.onreadystatechange = function(){
	if (request.readyState == 4 && request.status == 200) {
		var txms = request.responseText;
		//Muestra la cantidad de usuarios conectados
		funval = txms;
	}
 }
request.send(null);
} else {
alert("Debe actualizar su navegador para ejecutar algunas funciones");	
}
return funval;
}
//========================================================================
function Send_Email_Cont(){
	hidcap('dRegAlertC');
	InnerCtr('dRegAlertC_1', '');
	var ssection = this.dataset.sectionid;
	var semail = document.getElementById('txcoEmail');
	var sname = document.getElementById('txcoName');
	var sphone = document.getElementById('txcoPhone');
	var sCont = document.getElementById('cbCont');
	var stext = document.getElementById('txcoMsj');
	var sSave = document.getElementById('slSi');
	var dwait = document.getElementById('dWait-Con');
	var svali = '';	
	var smsj = '';
	//------------------------------------
	// Obtiene la clase actual del control
	snameC = sname.getAttribute('class');
	semailC = semail.getAttribute('class');
	sphoneC = sphone.getAttribute('class');
	sContC = sCont.getAttribute('class');
	stextC = stext.getAttribute('class');
	//Valida campos obligatorios
	if(sname.value == '' && window.getComputedStyle(sname, null).getPropertyValue("display") != 'none'){
		svali = 'No';		
		sname.className += " "+snameC+"-vacio";
		smsj = smsj + '<li>'+msj[1]+'</li>';
	}
	if(semail.value == '' && window.getComputedStyle(semail, null).getPropertyValue("display") != 'none'){
		svali = 'No';		
		semail.className += " "+semailC+"-vacio";
		smsj = smsj + '<li>'+msj[2]+'</li>';
	}
	if(sphone.value == '' && window.getComputedStyle(sphone, null).getPropertyValue("display") != 'none'){
		svali = 'No';		
		sphone.className += " "+sphoneC+"-vacio";
		smsj = smsj + '<li>'+msj[3]+'</li>';
	}
	if(sCont.value == '' && window.getComputedStyle(sCont, null).getPropertyValue("display") != 'none'){
		svali = 'No';		
		sCont.className += " "+sContC+"-vacio";
		smsj = smsj + '<li>'+msj[4]+'</li>';
	}
	if(stext.value == '' && window.getComputedStyle(stext, null).getPropertyValue("display") != 'none'){
		svali = 'No';		
		stext.className += " "+stextC+"-vacio";
		smsj = smsj + '<li>'+msj[5]+'</li>';
	}
	//-----------------------------------------------------
	if(svali != ''){
		viscap('dRegAlertC');
		smsj = msj[0]+'<ul>' + smsj + '</ul>';
		InnerCtr('dRegAlertC_1', smsj);
		setTimeout(function(){
			sname.className = snameC;
			semail.className = semailC;
			sphone.className = sphoneC;
			sCont.className = sContC;
			stext.className = stextC;
			hidcap('dRegAlertC');
		}, 5000);
		return false;
	}
	//--------------------------------------
	//Muestra pensando
	dwait.className='fcont_wait wait-visible';
	viscap('dWait-Con');
	//--------------------------------------
	//Env? de mensaje
	setTimeout(function(){
		var iresl = GenConret('General', 'SendCorr', sname.value + '|' + sphone.value + '|' + semail.value + '|' + sCont.value + '|' + stext.value + '|' + sSave.value + '|' + ssection, false);
		Reg_Event_2('Contacto', ssection, 'Contacto');
		InnerCtr('dRegSucC_1', iresl);
		hidcap('dWait-Con');
		dwait.className='fcont_wait';
		viscap('dRegSucC');
		setTimeout(function(){
			hidcap('dRegSucC');
		}, 7000);
	}, 1000);
}
//---------------------------------------
function Show_MenuR(){var dmenur = document.getElementById("dMenR");var dmenurc = document.getElementById("dMenR-capa");var dmenurm = document.getElementById("dMenR-menu");dmenur.style.visibility = 'visible';dmenurc.style.backgroundColor = "rgba(0,0,0,.6)";dmenurm.style.left = '0';}
function Hide_MenuR(){var dmenur = document.getElementById("dMenR");var dmenurc = document.getElementById("dMenR-capa");var dmenurm = document.getElementById("dMenR-menu");dmenurc.style.backgroundColor = "rgba(0,0,0,0)";dmenurm.style.left = '-100%';setTimeout(function(){dmenur.style.visibility = 'hidden';},600);}