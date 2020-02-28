// https://www.usnpl.com/search/state?state=AL
let cities = {};

jQuery(".result_city").each(function() {
  cities[
    $(this)
      .text()
      .trim()
  ] = [];
});

let headings = jQuery(".result_city")
  .parent()
  .parent()
  .toArray();

let findHeading = index => {
  let lastMax = -1;
  let _heading = null;

  headings.forEach(heading => {
    const _index = $(heading).index();
    if (_index > lastMax && _index < index) {
      lastMax = _index;
      _heading = heading;
    }
  });

  return _heading;
};

$(".fa-twitter")
  .parent()
  .parent()
  .parent()
  .each(function() {
    const tr = $(this);

    const index = tr.index();
    const heading = findHeading(index);

    const city = $(heading)
      .text()
      .replace(/(\r\n|\n|\r)/gm, "")
      .trim();
    if (city.trim().length === 0) {
      return;
    }

    if (city) {
      const row = {};
      row.name = tr.find("td.w-50").text();
      row.twitter = tr
        .find(".fa-twitter")
        .parent()
        .attr("href")
        .split("twitter.com/")[1];
      row.website = tr
        .find(".fa-link")
        .parent()
        .attr("href");
      row.facebook = tr
        .find(".fa-facebook")
        .parent()
        .attr("href");
      cities[city].push(row);
    } else {
      console.log("NO CITY FGOUND", index);
    }
  });

copy(cities);
