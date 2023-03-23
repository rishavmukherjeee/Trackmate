function getRandomName() {
 
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
   
  return result;
}

export default getRandomName;
