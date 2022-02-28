package co.gov.igac.ventanillaunica.util;

public class NotFoundExceptions extends RuntimeException {

	public NotFoundExceptions() {
		
	}
	
	public NotFoundExceptions (String message) {
		super(message);
	}
	
}
