import sharp from 'sharp';

const inputPath = 'public/pre/KNP02023 copy.jpg';
const outputPath = 'public/og-image.jpg';

async function processImage() {
  try {
    await sharp(inputPath)
      .resize(1080, 1080, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 65, progressive: true })
      .toFile(outputPath);
      
    console.log("Image processed successfully!");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImage();
