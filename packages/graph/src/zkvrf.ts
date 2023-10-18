import {
  OperatorRegistered as OperatorRegisteredEvent,
  RandomnessFulfilled as RandomnessFulfilledEvent,
  RandomnessRequested as RandomnessRequestedEvent,
} from '../generated/ZKVRF/ZKVRF';
import {
  Operator,
  OperatorRegistered,
  RandomnessFulfilled,
  RandomnessRequested,
  Request,
} from '../generated/schema';

export function handleOperatorRegistered(event: OperatorRegisteredEvent): void {
  const entity = new OperatorRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.operatorPublicKey = event.params.operatorPublicKey;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const operator = new Operator(event.params.operatorPublicKey);

  operator.registration = entity.id;

  operator.save();
}

export function handleRandomnessFulfilled(
  event: RandomnessFulfilledEvent
): void {
  const entity = new RandomnessFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.operatorPublicKey = event.params.operatorPublicKey;
  entity.requester = event.params.requester;
  entity.nonce = event.params.nonce;
  entity.randomness = event.params.randomness;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const request = Request.load(event.params.requestId.toString());

  if (!request) {
    throw new Error('Request not found');
  }

  request.fulfillment = entity.id;

  request.save();
}

export function handleRandomnessRequested(
  event: RandomnessRequestedEvent
): void {
  const entity = new RandomnessRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.requestId = event.params.requestId;
  entity.operatorPublicKey = event.params.operatorPublicKey;
  entity.requester = event.params.requester;
  entity.minBlockConfirmations = event.params.minBlockConfirmations;
  entity.callbackGasLimit = event.params.callbackGasLimit;
  entity.nonce = event.params.nonce;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  const request = new Request(event.params.requestId.toString());

  request.request = entity.id;
  request.operator = event.params.operatorPublicKey;

  request.save();
}
