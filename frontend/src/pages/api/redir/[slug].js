const redirects = {
  github: "https://github.com/DavidIlie",
  youtube: "https://youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA",
  twitch: "https://twitch.tv/AlbastruYT",
  twitter: "https://twitter.com/AlbastruYT",
};

export default function handler(req, res) {
  const slug = req.query.slug;
  if (redirects[slug] !== undefined) {
    res.redirect(redirects[slug]);
  } else {
    res.status(404).json({ message: "Redirect not found" });
  }
}
