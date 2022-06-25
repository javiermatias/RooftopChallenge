const endPoint = "https://rooftop-career-switch.herokuapp.com";

let config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

async function getToken(email) {

  try {
    let token = await fetch(`${endPoint}/token?email=${email}`);
    token = await token.json();
    return token.token;
  } catch (error) {
    throw new Error(`Error getting token: ${error.message || error}`);
  }

}



async function getBlocks(token) {

  try {
    let block = await fetch(`${endPoint}/blocks?token=${token}`);
    block = await block.json();
    return block;
  } catch (error) {
    throw new Error(`Error getting blocks: ${error.message || error}`);
  }

}


async function verify(string, token) {

  try {
    config.body = JSON.stringify(string);
    let check = await fetch(`${endPoint}/check?token=${token}`, config);
    check = await check.json();
    return check.message;
  } catch (error) {
    throw new Error(`Error verifing the solution: ${error.message || error}`);
  }


}



async function validBlock(blocks, token) {

  try {
    config.body = JSON.stringify(blocks);
    let blockValid = await fetch(`${endPoint}/check?token=${token}`, config);
    blockValid = await blockValid.json();
    return blockValid.message;
  } catch (error) {
    throw new Error(`Error verifing a valid block: ${error.message || error}`);
  }

}



async function check(blocks = [], token = '') {

  try {
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
  } catch (error) {
    throw new Error(`Error in function check: ${error.message || error}`);
  }

  return blocks;
}


if (typeof module !== 'undefined') {
  module.exports = {
    check: check
  };
}


