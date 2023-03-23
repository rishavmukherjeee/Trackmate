let randomName = '';

function getRandomName() {
  if (randomName === '') {
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    randomName = result;
  }
  return randomName;
}

export default getRandomName;
