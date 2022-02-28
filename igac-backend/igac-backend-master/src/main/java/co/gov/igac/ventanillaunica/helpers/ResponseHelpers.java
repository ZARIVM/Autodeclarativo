package co.gov.igac.ventanillaunica.helpers;

import java.util.ArrayList;
import java.util.List;

public class ResponseHelpers {
	
	public String status;
	public String message;
	public ResponseDataHelpers data ;
	
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public ResponseDataHelpers getData() {
		return data;
	}
	public void setData(ResponseDataHelpers data) {
		this.data = data;
	}

	
	
	
	
	

}
