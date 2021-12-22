export default class Cloudinary {
  async imageUpload(file, tags) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wgjkx4in");
    formData.append("folder", "Menu Creator/Menu Pictures");
    formData.append("tags", tags);

    const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  }
}
