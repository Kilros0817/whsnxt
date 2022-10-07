const  { REACT_APP_VIDEOSDK_TOKEN, REACT_APP_AUTH_URL } = process.env;

const API_BASE_URL = "https://api.zujonow.com";
const API_AUTH_URL = REACT_APP_AUTH_URL;

export const token = REACT_APP_VIDEOSDK_TOKEN;

export const getToken = async () => {
  if (REACT_APP_VIDEOSDK_TOKEN && API_AUTH_URL) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (REACT_APP_VIDEOSDK_TOKEN) {
    return REACT_APP_VIDEOSDK_TOKEN;
  } else if (API_AUTH_URL) {
    const res = await fetch(`${API_AUTH_URL}/get-token`, {
      method: "GET",
    });
    const { token } = await res.json();
    return token;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async () => {
  const url = `https://api.videosdk.live/v1/meetings`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const { meetingId } = await fetch(url, options)
    .then((response) => response.json())
    .catch((error) => console.error("error", error));
    console.log("meetingId-------->", meetingId);
    return meetingId;
};

export const validateMeeting = async ({ meetingId, token }) => {
  const url = `https://api.videosdk.live/v1/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  const result = await fetch(url, options)
    .then((response) => response.json()) //result will have meeting id
    .catch((error) => console.error("error", error));

  return result ? result.meetingId : false;
};