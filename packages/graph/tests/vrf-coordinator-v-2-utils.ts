import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
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
} from "../generated/VRFCoordinatorV2/VRFCoordinatorV2"

export function createConfigSetEvent(
  minimumRequestConfirmations: i32,
  maxGasLimit: BigInt,
  stalenessSeconds: BigInt,
  gasAfterPaymentCalculation: BigInt,
  fallbackWeiPerUnitLink: BigInt,
  feeConfig: ethereum.Tuple
): ConfigSet {
  let configSetEvent = changetype<ConfigSet>(newMockEvent())

  configSetEvent.parameters = new Array()

  configSetEvent.parameters.push(
    new ethereum.EventParam(
      "minimumRequestConfirmations",
      ethereum.Value.fromUnsignedBigInt(
        BigInt.fromI32(minimumRequestConfirmations)
      )
    )
  )
  configSetEvent.parameters.push(
    new ethereum.EventParam(
      "maxGasLimit",
      ethereum.Value.fromUnsignedBigInt(maxGasLimit)
    )
  )
  configSetEvent.parameters.push(
    new ethereum.EventParam(
      "stalenessSeconds",
      ethereum.Value.fromUnsignedBigInt(stalenessSeconds)
    )
  )
  configSetEvent.parameters.push(
    new ethereum.EventParam(
      "gasAfterPaymentCalculation",
      ethereum.Value.fromUnsignedBigInt(gasAfterPaymentCalculation)
    )
  )
  configSetEvent.parameters.push(
    new ethereum.EventParam(
      "fallbackWeiPerUnitLink",
      ethereum.Value.fromSignedBigInt(fallbackWeiPerUnitLink)
    )
  )
  configSetEvent.parameters.push(
    new ethereum.EventParam("feeConfig", ethereum.Value.fromTuple(feeConfig))
  )

  return configSetEvent
}

export function createFundsRecoveredEvent(
  to: Address,
  amount: BigInt
): FundsRecovered {
  let fundsRecoveredEvent = changetype<FundsRecovered>(newMockEvent())

  fundsRecoveredEvent.parameters = new Array()

  fundsRecoveredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  fundsRecoveredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsRecoveredEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createProvingKeyDeregisteredEvent(
  keyHash: Bytes,
  oracle: Address
): ProvingKeyDeregistered {
  let provingKeyDeregisteredEvent = changetype<ProvingKeyDeregistered>(
    newMockEvent()
  )

  provingKeyDeregisteredEvent.parameters = new Array()

  provingKeyDeregisteredEvent.parameters.push(
    new ethereum.EventParam("keyHash", ethereum.Value.fromFixedBytes(keyHash))
  )
  provingKeyDeregisteredEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )

  return provingKeyDeregisteredEvent
}

export function createProvingKeyRegisteredEvent(
  keyHash: Bytes,
  oracle: Address
): ProvingKeyRegistered {
  let provingKeyRegisteredEvent = changetype<ProvingKeyRegistered>(
    newMockEvent()
  )

  provingKeyRegisteredEvent.parameters = new Array()

  provingKeyRegisteredEvent.parameters.push(
    new ethereum.EventParam("keyHash", ethereum.Value.fromFixedBytes(keyHash))
  )
  provingKeyRegisteredEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )

  return provingKeyRegisteredEvent
}

export function createRandomWordsFulfilledEvent(
  requestId: BigInt,
  outputSeed: BigInt,
  payment: BigInt,
  success: boolean
): RandomWordsFulfilled {
  let randomWordsFulfilledEvent = changetype<RandomWordsFulfilled>(
    newMockEvent()
  )

  randomWordsFulfilledEvent.parameters = new Array()

  randomWordsFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  randomWordsFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "outputSeed",
      ethereum.Value.fromUnsignedBigInt(outputSeed)
    )
  )
  randomWordsFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "payment",
      ethereum.Value.fromUnsignedBigInt(payment)
    )
  )
  randomWordsFulfilledEvent.parameters.push(
    new ethereum.EventParam("success", ethereum.Value.fromBoolean(success))
  )

  return randomWordsFulfilledEvent
}

export function createRandomWordsRequestedEvent(
  keyHash: Bytes,
  requestId: BigInt,
  preSeed: BigInt,
  subId: BigInt,
  minimumRequestConfirmations: i32,
  callbackGasLimit: BigInt,
  numWords: BigInt,
  sender: Address
): RandomWordsRequested {
  let randomWordsRequestedEvent = changetype<RandomWordsRequested>(
    newMockEvent()
  )

  randomWordsRequestedEvent.parameters = new Array()

  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam("keyHash", ethereum.Value.fromFixedBytes(keyHash))
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "preSeed",
      ethereum.Value.fromUnsignedBigInt(preSeed)
    )
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumRequestConfirmations",
      ethereum.Value.fromUnsignedBigInt(
        BigInt.fromI32(minimumRequestConfirmations)
      )
    )
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "callbackGasLimit",
      ethereum.Value.fromUnsignedBigInt(callbackGasLimit)
    )
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "numWords",
      ethereum.Value.fromUnsignedBigInt(numWords)
    )
  )
  randomWordsRequestedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return randomWordsRequestedEvent
}

export function createSubscriptionCanceledEvent(
  subId: BigInt,
  to: Address,
  amount: BigInt
): SubscriptionCanceled {
  let subscriptionCanceledEvent = changetype<SubscriptionCanceled>(
    newMockEvent()
  )

  subscriptionCanceledEvent.parameters = new Array()

  subscriptionCanceledEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionCanceledEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  subscriptionCanceledEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return subscriptionCanceledEvent
}

export function createSubscriptionConsumerAddedEvent(
  subId: BigInt,
  consumer: Address
): SubscriptionConsumerAdded {
  let subscriptionConsumerAddedEvent = changetype<SubscriptionConsumerAdded>(
    newMockEvent()
  )

  subscriptionConsumerAddedEvent.parameters = new Array()

  subscriptionConsumerAddedEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionConsumerAddedEvent.parameters.push(
    new ethereum.EventParam("consumer", ethereum.Value.fromAddress(consumer))
  )

  return subscriptionConsumerAddedEvent
}

export function createSubscriptionConsumerRemovedEvent(
  subId: BigInt,
  consumer: Address
): SubscriptionConsumerRemoved {
  let subscriptionConsumerRemovedEvent = changetype<
    SubscriptionConsumerRemoved
  >(newMockEvent())

  subscriptionConsumerRemovedEvent.parameters = new Array()

  subscriptionConsumerRemovedEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionConsumerRemovedEvent.parameters.push(
    new ethereum.EventParam("consumer", ethereum.Value.fromAddress(consumer))
  )

  return subscriptionConsumerRemovedEvent
}

export function createSubscriptionCreatedEvent(
  subId: BigInt,
  owner: Address
): SubscriptionCreated {
  let subscriptionCreatedEvent = changetype<SubscriptionCreated>(newMockEvent())

  subscriptionCreatedEvent.parameters = new Array()

  subscriptionCreatedEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return subscriptionCreatedEvent
}

export function createSubscriptionFundedEvent(
  subId: BigInt,
  oldBalance: BigInt,
  newBalance: BigInt
): SubscriptionFunded {
  let subscriptionFundedEvent = changetype<SubscriptionFunded>(newMockEvent())

  subscriptionFundedEvent.parameters = new Array()

  subscriptionFundedEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionFundedEvent.parameters.push(
    new ethereum.EventParam(
      "oldBalance",
      ethereum.Value.fromUnsignedBigInt(oldBalance)
    )
  )
  subscriptionFundedEvent.parameters.push(
    new ethereum.EventParam(
      "newBalance",
      ethereum.Value.fromUnsignedBigInt(newBalance)
    )
  )

  return subscriptionFundedEvent
}

export function createSubscriptionOwnerTransferRequestedEvent(
  subId: BigInt,
  from: Address,
  to: Address
): SubscriptionOwnerTransferRequested {
  let subscriptionOwnerTransferRequestedEvent = changetype<
    SubscriptionOwnerTransferRequested
  >(newMockEvent())

  subscriptionOwnerTransferRequestedEvent.parameters = new Array()

  subscriptionOwnerTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionOwnerTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  subscriptionOwnerTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return subscriptionOwnerTransferRequestedEvent
}

export function createSubscriptionOwnerTransferredEvent(
  subId: BigInt,
  from: Address,
  to: Address
): SubscriptionOwnerTransferred {
  let subscriptionOwnerTransferredEvent = changetype<
    SubscriptionOwnerTransferred
  >(newMockEvent())

  subscriptionOwnerTransferredEvent.parameters = new Array()

  subscriptionOwnerTransferredEvent.parameters.push(
    new ethereum.EventParam("subId", ethereum.Value.fromUnsignedBigInt(subId))
  )
  subscriptionOwnerTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  subscriptionOwnerTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return subscriptionOwnerTransferredEvent
}
