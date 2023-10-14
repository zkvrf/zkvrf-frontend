import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { ConfigSet } from "../generated/schema"
import { ConfigSet as ConfigSetEvent } from "../generated/VRFCoordinatorV2/VRFCoordinatorV2"
import { handleConfigSet } from "../src/vrf-coordinator-v-2"
import { createConfigSetEvent } from "./vrf-coordinator-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let minimumRequestConfirmations = 123
    let maxGasLimit = BigInt.fromI32(234)
    let stalenessSeconds = BigInt.fromI32(234)
    let gasAfterPaymentCalculation = BigInt.fromI32(234)
    let fallbackWeiPerUnitLink = BigInt.fromI32(234)
    let feeConfig = "ethereum.Tuple Not implemented"
    let newConfigSetEvent = createConfigSetEvent(
      minimumRequestConfirmations,
      maxGasLimit,
      stalenessSeconds,
      gasAfterPaymentCalculation,
      fallbackWeiPerUnitLink,
      feeConfig
    )
    handleConfigSet(newConfigSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ConfigSet created and stored", () => {
    assert.entityCount("ConfigSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ConfigSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "minimumRequestConfirmations",
      "123"
    )
    assert.fieldEquals(
      "ConfigSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maxGasLimit",
      "234"
    )
    assert.fieldEquals(
      "ConfigSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "stalenessSeconds",
      "234"
    )
    assert.fieldEquals(
      "ConfigSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "gasAfterPaymentCalculation",
      "234"
    )
    assert.fieldEquals(
      "ConfigSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fallbackWeiPerUnitLink",
      "234"
    )
    assert.fieldEquals(
      "ConfigSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "feeConfig",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
