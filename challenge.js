const endPoint = "https://rooftop-career-switch.herokuapp.com";

let config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

async function getToken(email) {
  let token = await fetch(`${endPoint}/token?email=${email}`);
  token = await token.json();
  return token.token;
}



async function getBlocks(token) {
  let block = await fetch(`${endPoint}/blocks?token=${token}`);
  block = await block.json();
  return block;
}


async function verify(string, token) {
  config.body = JSON.stringify(string);

  let check = await fetch(`${endPoint}/check?token=${token}`, config);
  check = await check.json();
  return check.message;

}



async function validBlock(blocks, token) {
  config.body = JSON.stringify(blocks);
  let blockValid = await fetch(`${endPoint}/check?token=${token}`, config);
  blockValid = await blockValid.json();
  return blockValid.message;
}



async function check(blocks = [], token = '') {

  for (let i = 0; i < blocks.length - 1; i++) {
    for (let j = i + 1; j < blocks.length; j++) {
      let obj = { "blocks": [blocks[i], blocks[j]] };
      if (await validBlock(obj, token)) {
        let temp = blocks[i + 1];
        blocks[i + 1] = blocks[j];
        blocks[j] = temp;
        break;
      }
    }
  }

  return blocks;
}


if (typeof module !== 'undefined') {
  module.exports = {
    check: check
  };
}


