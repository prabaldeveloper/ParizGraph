// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DataAdded extends ethereum.Event {
  get params(): DataAdded__Params {
    return new DataAdded__Params(this);
  }
}

export class DataAdded__Params {
  _event: DataAdded;

  constructor(event: DataAdded) {
    this._event = event;
  }

  get userAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get data(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class history extends ethereum.SmartContract {
  static bind(address: Address): history {
    return new history("history", address);
  }

  getEventData(eventTokenId: BigInt): Array<string> {
    let result = super.call(
      "getEventData",
      "getEventData(uint256):(string[])",
      [ethereum.Value.fromUnsignedBigInt(eventTokenId)]
    );

    return result[0].toStringArray();
  }

  try_getEventData(eventTokenId: BigInt): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getEventData",
      "getEventData(uint256):(string[])",
      [ethereum.Value.fromUnsignedBigInt(eventTokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  getUserData(userAddress: Address): Array<string> {
    let result = super.call("getUserData", "getUserData(address):(string[])", [
      ethereum.Value.fromAddress(userAddress)
    ]);

    return result[0].toStringArray();
  }

  try_getUserData(userAddress: Address): ethereum.CallResult<Array<string>> {
    let result = super.tryCall(
      "getUserData",
      "getUserData(address):(string[])",
      [ethereum.Value.fromAddress(userAddress)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toStringArray());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  signerAddress(): Address {
    let result = super.call("signerAddress", "signerAddress():(address)", []);

    return result[0].toAddress();
  }

  try_signerAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "signerAddress",
      "signerAddress():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class AddDataCall extends ethereum.Call {
  get inputs(): AddDataCall__Inputs {
    return new AddDataCall__Inputs(this);
  }

  get outputs(): AddDataCall__Outputs {
    return new AddDataCall__Outputs(this);
  }
}

export class AddDataCall__Inputs {
  _call: AddDataCall;

  constructor(call: AddDataCall) {
    this._call = call;
  }

  get userAddress(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get eventTokenId(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get data(): Array<string> {
    return this._call.inputValues[2].value.toStringArray();
  }
}

export class AddDataCall__Outputs {
  _call: AddDataCall;

  constructor(call: AddDataCall) {
    this._call = call;
  }
}

export class AddSignerCall extends ethereum.Call {
  get inputs(): AddSignerCall__Inputs {
    return new AddSignerCall__Inputs(this);
  }

  get outputs(): AddSignerCall__Outputs {
    return new AddSignerCall__Outputs(this);
  }
}

export class AddSignerCall__Inputs {
  _call: AddSignerCall;

  constructor(call: AddSignerCall) {
    this._call = call;
  }

  get _signerAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddSignerCall__Outputs {
  _call: AddSignerCall;

  constructor(call: AddSignerCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
