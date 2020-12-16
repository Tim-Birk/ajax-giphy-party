// normally I would store this in a .env file, but for the purposes of this project I made it a constant here
const GIPHY_API_KEY = "CFqpyiFm8I8NvlES09NOLqmSUq9XAOxw";

// Add event listener to append new gif image to the DOM using the search term from the form
$("form").on("submit", (e) => {
  e.preventDefault();

  const searchTerm = $("#search")
  addGifToGallery(searchTerm.val());
  searchTerm.val("")
});

// Add event listener to remove all gif divs when remove button is clicked
$("#remove").on("click", e => {
    $("#gif-gallery").children("div").remove()
})

addGifToGallery = async (searchTerm) => {
  try {
    const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: GIPHY_API_KEY,
        q: searchTerm,
        limit: 1,
      },
    });

    const objGif = response.data.data[0];
    
    if (objGif) {
        addGifToDOM(objGif)
    } else {
        throw new Error("No GIF found :(")
    }
  } catch (err) {
    console.log(err);
  }
};

const addGifToDOM = (objGif) => {
    const url = objGif.images.original.url;
    const alt = objGif.title;

    const gif = $("<div>")
      .addClass("col-12 col-sm-6 col-xl-4")
      .addClass("mb-2")
      .append($("<img>").attr({ src: url, alt: alt }).addClass("img-fluid"));

    $("#gif-gallery").append(gif);
}
