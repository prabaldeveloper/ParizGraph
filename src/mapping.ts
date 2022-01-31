import { BigInt } from "@graphprotocol/graph-ts"
import {
  buddy,
  Approval,
  ApprovalForAll,
  BaseURIUpdated,
  Minted,
  TokenCreatorUpdated,
  TokenUpdated,
  Transfer,
  Updated
} from "../generated/buddy/buddy"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._owner = event.params._owner
  entity._approved = event.params._approved

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.balanceOf(...)
  // - contract.baseURI(...)
  // - contract.fees(...)
  // - contract.getApproved(...)
  // - contract.getNextTokenId(...)
  // - contract.getTokenIPFSPath(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.ownerOf(...)
  // - contract.symbol(...)
  // - contract.tokenCreator(...)
  // - contract.tokenURI(...)
  // - contract.tokens(...)
}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleBaseURIUpdated(event: BaseURIUpdated): void {}

export function handleMinted(event: Minted): void {}

export function handleTokenCreatorUpdated(event: TokenCreatorUpdated): void {}

export function handleTokenUpdated(event: TokenUpdated): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUpdated(event: Updated): void {}
