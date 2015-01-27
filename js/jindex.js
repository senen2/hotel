/**
 * @author botpi
 */

function login()
{
	LoginH($("#email").val(), $("#passwd").val(), aceptado)	
}

function aceptado(email, response)
{
	if (response.email==email) {
		$("#avisoerror").hide();
		encabezado = "'" + response.email + "','" + response.clave + "'";
		document.cookie = "encabezado=" + encabezado;		
		window.location.assign("ocupacion.html");		
	}
	else
	{
		$("#aviso").removeClass("DN");
	}
}
