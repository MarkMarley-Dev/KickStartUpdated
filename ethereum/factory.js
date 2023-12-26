import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x93942D24AB37F6a6E87d80a09aab76dB7b93EA9E'
);

export default instance;
