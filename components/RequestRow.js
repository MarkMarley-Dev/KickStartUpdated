const { Component } = require('react');
import { Tab, Table, Row, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0],
    });
  };

  onFinalise = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0],
    });
  };
  render() {
    const { Row, Cell } = Table;
    const { description, value, recipient, approvalCount } = this.props.request;
    const { id, approversCount, request } = this.props;
    const readyToFinalise =
      request.approvalCount >= parseInt(approversCount) / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalise && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{description}</Cell>
        <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
        <Cell>{recipient}</Cell>
        <Cell>{`${approvalCount} / ${approversCount}`}</Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="blue" basic onClick={this.onFinalise}>
              Finalise
            </Button>
          )}
        </Cell>
        <Cell></Cell>
      </Row>
    );
  }
}

export default RequestRow;
