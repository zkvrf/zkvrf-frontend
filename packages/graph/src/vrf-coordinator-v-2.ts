import {
  ConfigSet as ConfigSetEvent,
  FundsRecovered as FundsRecoveredEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  ProvingKeyDeregistered as ProvingKeyDeregisteredEvent,
  ProvingKeyRegistered as ProvingKeyRegisteredEvent,
  RandomWordsFulfilled as RandomWordsFulfilledEvent,
  RandomWordsRequested as RandomWordsRequestedEvent,
  SubscriptionCanceled as SubscriptionCanceledEvent,
  SubscriptionConsumerAdded as SubscriptionConsumerAddedEvent,
  SubscriptionConsumerRemoved as SubscriptionConsumerRemovedEvent,
  SubscriptionCreated as SubscriptionCreatedEvent,
  SubscriptionFunded as SubscriptionFundedEvent,
  SubscriptionOwnerTransferRequested as SubscriptionOwnerTransferRequestedEvent,
  SubscriptionOwnerTransferred as SubscriptionOwnerTransferredEvent
} from "../generated/VRFCoordinatorV2/VRFCoordinatorV2"
import {
  ConfigSet,
  FundsRecovered,
  OwnershipTransferRequested,
  OwnershipTransferred,
  ProvingKeyDeregistered,
  ProvingKeyRegistered,
  RandomWordsFulfilled,
  RandomWordsRequested,
  SubscriptionCanceled,
  SubscriptionConsumerAdded,
  SubscriptionConsumerRemoved,
  SubscriptionCreated,
  SubscriptionFunded,
  SubscriptionOwnerTransferRequested,
  SubscriptionOwnerTransferred
} from "../generated/schema"

export function handleConfigSet(event: ConfigSetEvent): void {
  let entity = new ConfigSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.minimumRequestConfirmations = event.params.minimumRequestConfirmations
  entity.maxGasLimit = event.params.maxGasLimit
  entity.stalenessSeconds = event.params.stalenessSeconds
  entity.gasAfterPaymentCalculation = event.params.gasAfterPaymentCalculation
  entity.fallbackWeiPerUnitLink = event.params.fallbackWeiPerUnitLink
  entity.feeConfig_fulfillmentFlatFeeLinkPPMTier1 =
    event.params.feeConfig.fulfillmentFlatFeeLinkPPMTier1
  entity.feeConfig_fulfillmentFlatFeeLinkPPMTier2 =
    event.params.feeConfig.fulfillmentFlatFeeLinkPPMTier2
  entity.feeConfig_fulfillmentFlatFeeLinkPPMTier3 =
    event.params.feeConfig.fulfillmentFlatFeeLinkPPMTier3
  entity.feeConfig_fulfillmentFlatFeeLinkPPMTier4 =
    event.params.feeConfig.fulfillmentFlatFeeLinkPPMTier4
  entity.feeConfig_fulfillmentFlatFeeLinkPPMTier5 =
    event.params.feeConfig.fulfillmentFlatFeeLinkPPMTier5
  entity.feeConfig_reqsForTier2 = event.params.feeConfig.reqsForTier2
  entity.feeConfig_reqsForTier3 = event.params.feeConfig.reqsForTier3
  entity.feeConfig_reqsForTier4 = event.params.feeConfig.reqsForTier4
  entity.feeConfig_reqsForTier5 = event.params.feeConfig.reqsForTier5

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsRecovered(event: FundsRecoveredEvent): void {
  let entity = new FundsRecovered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent
): void {
  let entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

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

export function handleSubscriptionCanceled(
  event: SubscriptionCanceledEvent
): void {
  let entity = new SubscriptionCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionConsumerAdded(
  event: SubscriptionConsumerAddedEvent
): void {
  let entity = new SubscriptionConsumerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.consumer = event.params.consumer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionConsumerRemoved(
  event: SubscriptionConsumerRemovedEvent
): void {
  let entity = new SubscriptionConsumerRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.consumer = event.params.consumer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionCreated(
  event: SubscriptionCreatedEvent
): void {
  let entity = new SubscriptionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionFunded(event: SubscriptionFundedEvent): void {
  let entity = new SubscriptionFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.oldBalance = event.params.oldBalance
  entity.newBalance = event.params.newBalance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionOwnerTransferRequested(
  event: SubscriptionOwnerTransferRequestedEvent
): void {
  let entity = new SubscriptionOwnerTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSubscriptionOwnerTransferred(
  event: SubscriptionOwnerTransferredEvent
): void {
  let entity = new SubscriptionOwnerTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subId = event.params.subId
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
