package com.backend.comsiontest.vo;

public class TipoResponse {

    private String value;



    private String text;

    public TipoResponse(String value, String text) {
		super();
		this.value = value;
		this.text = text;
	}


	public TipoResponse() {
    }


    public String getValue() {
        return value;
    }

    public void setValue(String id) {
        this.value = id;
    }


	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}


}
