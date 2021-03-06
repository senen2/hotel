/**
 * @author botpi
 */

function inicioOcupacion()
{
	encabezado = getCookie("encabezado");
	if (encabezado==null || encabezado=="" || encabezado=="'',''")
		encabezado="'',''";
		
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Subir_imagenes_de_los_productos";
	pagina = "hOcupacion";
	leeServidor();
	poneDatePicker("#fecha", "", new Date()); //"d M yy"
	actualizaOcupacion();
}

function dibujaOcupacion(datos)
{
	if (!datos) 
		window.location.assign("index.html");
		
	gdatos = datos;
	var n = (Math.sqrt(gdatos.length) + 1);
	n = n * n; 
	var cad = "", noches
		t = $("#ocupacion").position().top,
		l = $("#ocupacion").position().left,
		h = parseInt(Math.sqrt(($(window).width())*($(document).height()-t-40)/n/1.62))-1,
		w = parseInt(1.62 * h); 		
 		
	$.each(gdatos, function(i, item) {
		noches = item.noches;
		if (item.noches==null)
			noches="";
		
		cad += '<div class="node col item" onclick="verHabitacion(' + item.ID + ')" style="' 
			+ 'width:' + w + 'px;'
			+ 'max-width:' + w + 'px;'
			+ 'height:' + h + 'px;'
			+ 'background-image:' + item.color + ';'
			+ '">' + item.nombre
			+ ' ' + item.nombretipo
			+ '<br>' + noches
			+ '<br>' + item.cliente
			+ '</div>';
	});	
	$("#ocupacion").html(cad);
	
}

function actualizaOcupacion()
{
	cancelar();
	LeeOcupacionH(1, new Date($("#fecha").val()), dibujaOcupacion);
}

function addDays(dias)
{
	var f = tomaDatePicker($("#fecha").val());
	f = f.setDate(f.getDate() + dias);
	$("#fecha").datepicker( "setDate", new Date(f));
	actualizaOcupacion();
}

function verHabitacion(IDhab)
{
	LeeHabitacionH(IDhab, new Date($("#fecha").val()), dibujaHabitacion);
}

function dibujaHabitacion(datos)
{
	gdatosdet = datos;
    $('#hab').css({'top':$(window).height()/2-$("#hab").height()/2,'left':$(window).width()/2-$("#hab").width()/2});
	$("#hab").removeClass("DN");
	$("#nombrehab").html(datos.hab.nombre + " " + datos.hab.nombretipo);
	$("#cliente").val(datos.hab.cliente);
	$("#telefono").val(datos.hab.telefono);
	$("#noches").val(datos.hab.noches);
	$("#precio").val(datos.hab.precio.formatMoney(0));
	$("#saldo").html(datos.hab.pendiente.formatMoney(0));
    $("#notas").val(datos.hab.notas);
	//$("#notas").html(datos.hab.notas);
	llenaSelector(datos.planes, "plan");
	poneSelector(datos.hab.IDplan, "plan");
	if (datos.hab.IDreserva==0) {
		$("#botonAceptar").html("Crear Reserva");
		$("#botonPagar").hide();		
		$("#divsaldo").hide();		
		$("#divnotas").hide();
		$("#cliente").focus();

		$("#cliente").attr('disabled', false);;
		$("#telefono").attr('disabled', false);;
		$("#noches").attr('disabled', false);;
		$("#precio").attr('disabled', false);;
		$("#plan").attr('disabled', false);;
	}
	else {
		$("#botonAceptar").html("Borrar Reserva");
		$("#botonPagar").show();
		$("#divsaldo").show();		
		$("#divnotas").show();

		$("#cliente").attr('disabled', true);;
		$("#telefono").attr('disabled', true);;
		$("#noches").attr('disabled', true);;
		$("#precio").attr('disabled', true);;
		$("#plan").attr('disabled', true);;
	}

    $('#pago').css({'top':$(window).height()/2-$("#pago").height()/2,'left':$(window).width()/2-$("#pago").width()/2});
	$("#nombrehab2").html(datos.hab.nombre + " " + datos.hab.nombretipo);
	$("#cliente2").html(datos.hab.cliente);
	$("#precio2").html(datos.hab.precio.formatMoney(0));
	$("#saldo2").html(datos.hab.pendiente.formatMoney(0));
    $("#abono").val("");
	llenaSelector(datos.pagostipo, "pagotipo");

	tapar();
}

function actualizaPrecio()
{
	var IDplan = $("#plan").val()
		, noches = parseInt($("#noches").val().replace(",",""));
	$.each(gdatosdet.planes, function(i, item) {
		if (item.ID==IDplan) 
			$("#precio").val(((gdatosdet.hab.precio + item.precioa)*noches).formatMoney(0));
	});	
}

function grabarNotas()
{
	GrabarNotasH(gdatosdet.hab.IDreserva, $("#notas").val())
}


// ------------------ ventana emergente

function aceptar()
{
	if (gdatosdet.hab.IDreserva==0) {
		if ($("#cliente").val()=="" | parseInt($("#noches").val().replace(",",""))==0 | $("#noches").val()=="") {
			alert("faltan datos");
		}
		else {
			var precio = parseFloat($("#precio").val().replace(",","").replace(",",""));
			CreaReservaH($("#cliente").val(), $("#telefono").val(), gdatosdet.hab.ID, $("#plan").val()
				, new Date($("#fecha").val()), $("#noches").val(), precio, actualizaOcupacion);		
		}
	}
	else {
		BorraReservaH(gdatosdet.hab.IDreserva, actualizaOcupacion);
	}
}

function iraPago()
{
	$("#hab").addClass("DN");
	$("#pago").removeClass("DN");
	$("#abono").focus();
}

function aceptarPago()
{
	PagarH(gdatosdet.hab.IDreserva, $("#pagotipo").val(), $("#abono").val(), $("#nota").val(), cancelar);
}

function cancelar()
{
	$("#hab").addClass("DN");
	$("#pago").addClass("DN");
	$("#mask").addClass("DN");
    $('#mask').fadeOut(100);    
    $('#mask').fadeTo("slow",0);
    $('#mask').css({'width':0,'height':0});
}

function tapar()
{
	$("#mask").removeClass("DN");
    $('#mask').css({'width':$(window).width(),'height':$(document).height()});
    $('#mask').fadeIn(100);    
    $('#mask').fadeTo("slow",0.6);
}

// ---------------------- menu

function menuPop(state)
{
	if (state==1) {
    	$("#menu").addClass("out");
    	$("#mask2").removeClass("DN");
    	$('#mask2').css({'width':$(window).width(),'height':$(document).height()});
   }
   else {
    	$("#mask2").addClass("DN");
    	$("#menu").removeClass("out");
	}
}

function salir()
{
	encabezado="'',''";
	document.cookie = "encabezado=" + encabezado;
	window.location.assign("index.html")
}
