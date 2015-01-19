/**
 * @author Administrador
 */

function inicioReg() {
	pagina = "loginP";
	ayuda = "http://gtienda.com/wiki/mediawiki-1.23.5/index.php?title=Implementacion&section=#Crear_una_cuenta";
	$("#aviso").hide();
	inicioSinLogin();
}

function login()
{
	if (IsEmail($("#emaillogin").val()) & $("#passwdlogin").val()!="") {
		$("#aviso").hide();
		encabezado = "'" + $("#emaillogin").val() + "','" + $("#passwdlogin").val() + "','" + token + "'";
		loginP($("#comovendedor").is(":checked"), ingreso);
	}
	else
		$("#aviso").show();
}

function ingreso(response)
{
	if (response) {
		ajustaEncabezado(response)
		token = response.token;
		var pagpend = getCookie("pagpend");
		if (pagpend==null || pagpend=="")
			window.location.assign("catalogo.html");
		else {
			document.cookie = "pagpend="
			window.location.assign(pagpend);			
		}
	}
	else {
		encabezado = "'','',''";
		$("#aviso").show();
	}
}

function registro()
{
	if (!IsEmail($("#emailnuevo").val())) {
		$("#error").html("el correo está mal escrito");
		$("#error").show();
		return;
	}
	if ($("#nombrenuevo").val()=="") {
		$("#error").html("el nombre no puede estar vacio");
		$("#error").show();				
		return;
	}
		if ($("#empresanuevo").val()=="") {
		$("#error").html("la empresa no puede estar vacia");
		$("#error").show();				
		return;
	}
	if ($("#clave1nuevo").val()=="") {
		$("#error").html("la clave no puede estar vacia");
		$("#error").show();				
		return;
	}
	if ($("#clave1nuevo").val() != $("#clave2nuevo").val()) {
		$("#error").html("las claves deben ser iguales");
		$("#error").show();				
		return;
	}
	encabezado = "'" + $("#emailnuevo").val() + "','" + $("#clave1nuevo").val() + "','" + token + "'";
	CreaCuentaP($("#nombrenuevo").val(), $("#emailnuevo").val(), $("#empresanuevo").val(), $("#clave1nuevo").val(), ingreso)
}