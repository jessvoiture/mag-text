export const load = ({ fetch }) => {
  const fetchText = async () => {
    const res = await fetch("/data/mag_text.json");
    const data = await res.json();

    data.forEach(function (entry) {
      var dateString = entry.Date;
      var month = dateString.slice(4, 6);
      entry.month = +month;
      entry.year = +entry.year;
      entry.Date = +entry.Date;
    });

    return data;
  };

  const fetchContours = async () => {
    const res = await fetch("/data/contours.json");
    const data = await res.json();

    return data;
  };

  const fetchYTData = async () => {
    const res = await fetch("/data/vogue_yt.json");
    const data = await res.json();

    return data;
  };

  const fetchGoogleData = async () => {
    const res = await fetch("/data/vogue_mag_cover_google.json");
    const data = await res.json();

    return data;
  };

  return {
    magazines: fetchText(),
    contours: fetchContours(),
    yt: fetchYTData(),
    google: fetchGoogleData(),
  };
};
