import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x563aAc9B986aC17504f4DE72C608e28CE59623fd'
);

export default instance;
