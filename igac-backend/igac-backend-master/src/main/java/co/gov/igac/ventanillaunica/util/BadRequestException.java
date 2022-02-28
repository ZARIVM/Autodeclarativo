package co.gov.igac.ventanillaunica.util;


public class BadRequestException extends RuntimeException {

	public BadRequestException() {

	}

	public BadRequestException(String message) {
		super (message);
	}

}
