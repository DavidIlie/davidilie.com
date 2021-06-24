import axios from "axios";
import { toast } from "react-toastify";

const apis = [
  {
    name: "agenda",
    url: "https://davidilie.com/api/agenda",
  },
  {
    name: "mailer",
    url: "https://davidilie.com/api/mailer",
  },
  {
    name: "ytvideos",
    url: "https://davidilie.com/api/ytvideos",
  },
];

export async function checkAPI() {
  for (let i = 0; i < apis.length; i++) {
    const request = await axios.get(apis[i].url);
    if (request.status !== 200) {
      toast.error(`${apis[i].name} API is offline!`);
    }
  }
}
