package api;

public class RestResponse {

	public static final String SUCCESS = "success";
	public static final String ERROR = "error";

	private String status;
	private String message;

	public RestResponse(String status, String message) {
		this.status = status;
		this.message = message;
	}

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

}
