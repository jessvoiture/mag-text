export const load = ({ fetch }) => {
  const fetchText = async () => {
    const res = await fetch(
      "https://raw.githubusercontent.com/jessvoiture/mag-text/main/mag_text.json"
    );
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
    const res = await fetch("/contours.json");
    const data = await res.json();

    return data;
  };

  return {
    magazines: fetchText(),
    contours: fetchContours(),
  };
};
