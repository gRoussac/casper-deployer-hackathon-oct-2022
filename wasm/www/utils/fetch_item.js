export async function fetch_item(item) {
  wasmUrl = `${item}.wasm`;

  const res = await fetch(wasmUrl);
  const blob = await res.blob();
  console.log(item, blob);
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      // resolve(new Uint8Array(reader.result));
      resolve(reader.result);
    };
  });
}
