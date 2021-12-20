export default class Cloudinary {
  async imageUpload(file, tags) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wgjkx4in");
    formData.append("folder", "Icecreampunks/Request Photos");
    formData.append("tags", tags);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/db7ss52zt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    return await response.json();
  }
}
