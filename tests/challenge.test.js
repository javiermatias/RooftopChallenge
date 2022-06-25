const { check } = require('../challenge');

global.fetch = jest.fn((url, config) => {
  const blocksOrder = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];
  const blocks = JSON.parse(config.body);
  let message = {};
  if (blocksOrder.indexOf(blocks.blocks[1]) - blocksOrder.indexOf(blocks.blocks[0]) == 1) {
    message = { message: true };
  } else {
    message = { message: false };
  }

  return Promise.resolve({
    json: () => Promise.resolve(message),
  })
}
);
describe('Testing Check', () => {
  const token = "b93ac073-eae4-405d-b4ef-bb82e0036a1d";
  const blocks = ["f319", "3720", "4e3e", "46ec", "c7df", "c1c7", "80fd", "c4ea"];
  const blocksOrder = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];

  it('Verifing check', async () => {
    expect(await check(blocks, token)).toEqual(blocksOrder);
  })

  it('Error in fetch', async() => {
    fetch.mockImplementationOnce(() => Promise.reject("API Failure"));  
    expect(async() => {
      expect.assertions(1);
      try {
        await check(blocks, token);
      } catch (err) {
        expect(err).toEqual({
          error: 'Error verifing a valid block',
        });
      }
    });
  })
});

