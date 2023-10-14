import {
  ProvingKeyDeregistered as ProvingKeyDeregisteredEvent,
  ProvingKeyRegistered as ProvingKeyRegisteredEvent,
  RandomWordsFulfilled as RandomWordsFulfilledEvent,
  RandomWordsRequested as RandomWordsRequestedEvent
} from "../generated/VRFCoordinatorV2/VRFCoordinatorV2"
import {
  ProvingKeyDeregistered,
  ProvingKeyRegistered,
  RandomWordsFulfilled,
  RandomWordsRequested
} from "../generated/schema"

export function handleProvingKeyDeregistered(
  event: ProvingKeyDeregisteredEvent
): void {
  let entity = new ProvingKeyDeregistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.keyHash = event.params.keyHash
  entity.oracle = event.params.oracle

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleProvingKeyRegistered(
  event: ProvingKeyRegisteredEvent
): void {
  let entity = new ProvingKeyRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.keyHash = event.params.keyHash
  entity.oracle = event.params.oracle

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRandomWordsFulfilled(
  event: RandomWordsFulfilledEvent
): void {
  let entity = new RandomWordsFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.outputSeed = event.params.outputSeed
  entity.payment = event.params.payment
  entity.success = event.params.success

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRandomWordsRequested(
  event: RandomWordsRequestedEvent
): void {
  let entity = new RandomWordsRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.keyHash = event.params.keyHash
  entity.requestId = event.params.requestId
  entity.preSeed = event.params.preSeed
  entity.subId = event.params.subId
  entity.minimumRequestConfirmations = event.params.minimumRequestConfirmations
  entity.callbackGasLimit = event.params.callbackGasLimit
  entity.numWords = event.params.numWords
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
