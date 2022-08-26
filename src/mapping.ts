import { BigInt } from "@graphprotocol/graph-ts";
import {
  VenueAdded,
  VenueRentalCommissionUpdated
} from "../generated/Venue/Venue";

import {
  Erc20Details as Erc20DetailsEvent,
  conversion
} from "../generated/conversion/conversion";


import { VenueList, EventList, WhiteList, Erc20TokenEvent, Favourite, BookedTime, VenueRental, PlatformFee, IsEventPublic, BaseToken } from "../generated/schema";

import {
  events as eventsContract,
  EventAdded as EventAdded,
  // DescriptionUpdated as DescriptionUpdatedEvent,
  // StartTimeupdated as StartTimeupdatedEvent,
  // TokenIPFSPathUpdated as TokenIPFSPathUpdatedEvent,
  Featured as FeaturedEvent,
  WhiteList as WhiteListEvent,
  TokenWhitelisted as Erc20TokenUpdatedEvent,
  // Joined as JoinedEvent,
  // Bought as BoughtEvent,
  Favourite as FavouriteEvent,
  PlatformFeeUpdated as PlatformFeeUpdated,
  EventStatusUpdated
  
} from "../generated/events/events";


export function handleEventAdded(event: EventAdded): void {
  let token = EventList.load(event.params.tokenId.toString());
  if (!token) {
    token = new EventList(event.params.tokenId.toString());
    let contract = eventsContract.bind(event.address);
    let value = contract.getInfo(event.params.tokenId);
    token.eventTokenId = event.params.tokenId;
    token.venueTokenId = event.params.venueTokenId;
    token.eventName = value.value1;
    token.eventCategory = value.value2;
    token.eventDescription = value.value3;
    token.eventStartTime = value.value4;
    token.eventEndTime = value.value5;
    token.tokenCID = event.params.tokenCID;
    token.isVenueFeesPaid = event.params.isVenueFeesPaid;
    token.isPaid = event.params.isEventPaid;
    token.ticketPrice = event.params.ticketPrice;
    token.transactionHash = event.transaction.hash.toHexString();
    token.timestamp = event.block.timestamp;
    token.eventOrganiserAddress = event.params.eventOrganiser;
    token.isFeatured = false;
    token.tokenAddress = event.params.tokenAddress;
    token.eventStatus = "Plan to go";
  }
  let contract = eventsContract.bind(event.address);
  let value = contract.getInfo(event.params.tokenId);
  token.save();
  let tokenValue = BookedTime.load(event.params.venueTokenId.toString());
  if(!tokenValue) {
    tokenValue = new BookedTime(event.params.venueTokenId.toString());
    tokenValue.venueTokenId = event.params.venueTokenId;
    if(tokenValue.eventTokenId.length == 0) {
      let eventTokenIds = tokenValue.eventTokenId;
      tokenValue.eventTokenId = eventTokenIds.concat([event.params.tokenId]);
    }
    else {
      let eventTokenIds = tokenValue.eventTokenId;
      tokenValue.eventTokenId = eventTokenIds.concat([event.params.tokenId]);   
    }

    if(tokenValue.eventStartTime.length == 0 ) {
      let eventStartTimes = tokenValue.eventStartTime;
      tokenValue.eventStartTime = eventStartTimes.concat([value.value4]);
    }
    else {
      let eventStartTimes = tokenValue.eventStartTime;
      tokenValue.eventStartTime = eventStartTimes.concat([value.value4]);
    }

    if(tokenValue.eventEndTime.length== 0 ) {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([value.value5]);
    }
    else {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([value.value5]);
    }
  }

  else {
    tokenValue = BookedTime.load(event.params.venueTokenId.toString());
    if(tokenValue.eventTokenId.length == 0) {
      let eventTokenIds = tokenValue.eventTokenId;
      tokenValue.eventTokenId = eventTokenIds.concat([event.params.tokenId]);
    }
    else {
      let eventTokenIds = tokenValue.eventTokenId;
      tokenValue.eventTokenId = eventTokenIds.concat([event.params.tokenId]);   
    }

    if(tokenValue.eventStartTime.length == 0 ) {
      let eventStartTimes = tokenValue.eventStartTime;
      tokenValue.eventStartTime = eventStartTimes.concat([value.value4]);
    }
    else {
      let eventStartTimes = tokenValue.eventStartTime;
      tokenValue.eventStartTime = eventStartTimes.concat([value.value4]);
    }

    if(tokenValue.eventEndTime.length== 0 ) {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([value.value5]);
    }
    else {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([value.value5]);
    }
  }
  tokenValue.save();
  
}

// export function handleDescriptionUpdated(event: DescriptionUpdatedEvent): void {
//   let token = EventList.load(event.params.tokenId.toString());
//   if (!token) {
//     token = new EventList(event.params.tokenId.toString());
//     token.eventTokenId = event.params.tokenId;
//     token.eventDescription = event.params.description;
//   }
//   token.save();
// }

// export function handleIPFSPathUpdated(event: TokenIPFSPathUpdatedEvent): void {
//   let token = EventList.load(event.params.tokenId.toString());
//   if (!token) {
//     token = new EventList(event.params.tokenId.toString());
//     token.eventTokenId = event.params.tokenId;
//     token.tokenCID = event.params.tokenCID;
//   }
//   token.save();
// }

// export function handleStartTimeUpdated(event: StartTimeupdatedEvent): void {
//   let token = EventList.load(event.params.tokenId.toString());
//   if (!token) {
//     token = new EventList(event.params.tokenId.toString());
//     token.eventTokenId = event.params.tokenId;
//     token.eventStartTime = event.params.startTime;
//   }
//   token.save();
// }

export function handleFeatured(event: FeaturedEvent): void {
  let token = EventList.load(event.params.tokenId.toString());
  if (!token) {
    token = new EventList(event.params.tokenId.toString());
    token.eventTokenId = event.params.tokenId;
    token.isFeatured = event.params.isFeatured;
  }
  token.save();
}

export function handleWhiteList(event: WhiteListEvent): void {
  let token = WhiteList.load(event.params.whitelistedAddress.toString());
  if (!token) {
    token = new WhiteList(event.params.whitelistedAddress.toString());
    token.userAddress =event.params.whitelistedAddress;
    token.status = event.params.status;
  }
  token.save();
}

export function handleErc20TokenUpdatedEvent(event: Erc20TokenUpdatedEvent): void {
  let tokenDetail = Erc20TokenEvent.load(event.params.tokenAddress.toString());
  if(!tokenDetail) {
    tokenDetail = new Erc20TokenEvent(event.params.tokenAddress.toString());
    tokenDetail.tokenAddress = event.params.tokenAddress;
    tokenDetail.status = event.params.status;
  }
  else {
    tokenDetail.status = event.params.status;
    tokenDetail.tokenAddress = event.params.tokenAddress;
  }
  tokenDetail.save();
 
}

// export function handleJoined(event: JoinedEvent): void {
//   let token = EventList.load(event.params.tokenId.toString());
//   if(token) {
//     if(token.participantsList.length == 0) {
//       let userAddress = token.participantsList;
//       token.participantsList = userAddress.concat([event.params.user]);
//     }
//     else {
//       let userAddress = token.participantsList;
//       token.participantsList = userAddress.concat([event.params.user]);
//     }
//     token.save();
//   }
// }

// export function handleBought(event: BoughtEvent): void {
//   let token = EventList.load(event.params.tokenId.toString());
//   if(token) {
//     if(token.ticketBoughtAddress.length == 0) {
//       let userAddress = token.ticketBoughtAddress;
//       token.participantsList = userAddress.concat([event.params.buyer]);
//     }
//     else {
//       let userAddress = token.ticketBoughtAddress;
//       token.ticketBoughtAddress = userAddress.concat([event.params.buyer]);
//     }
//     token.save();
//   }
// }

export function handleFavourite(event: FavouriteEvent): void {
  let token = Favourite.load(event.params.user.toString());
  if(!token){
    token = new Favourite(event.params.user.toString());
    token.userAddress = event.params.user;
    if(token.eventTokenId.length == 0) {
      let tokenIds = token.eventTokenId;
      token.eventTokenId = tokenIds.concat([event.params.tokenId]);
    }
    else {
      let tokenIds = token.eventTokenId;
      token.eventTokenId = tokenIds.concat([event.params.tokenId]);
    }
  }
  else {
    token = Favourite.load(event.params.user.toString());
    if(token.eventTokenId.length == 0) {
      let tokenIds = token.eventTokenId;
      token.eventTokenId = tokenIds.concat([event.params.tokenId]);
    }
    else {
      let tokenIds = token.eventTokenId;
      token.eventTokenId = tokenIds.concat([event.params.tokenId]);
    }

  }
}

export function handlePlatformFee(event: PlatformFeeUpdated): void {
  let token = PlatformFee.load(event.params.platformFeePercent.toString());
  if(!token){
    token = new PlatformFee(event.params.platformFeePercent.toString());
    token.PlatformFeePercent = event.params.platformFeePercent;
  }
  else {
    token.PlatformFeePercent = event.params.platformFeePercent;
  }
  token.save();
}

export function handleEventStatus(event: EventStatusUpdated): void {
  // let token = IsEventPublic.load(event.params.isPublic.toString());
  // if(!token){
  //   token = new IsEventPublic(event.params.isPublic.toString());
  //   token.eventStatus = event.params.isPublic;
  // }
  // else {
  //   token.eventStatus = event.params.isPublic;
  // }
  // token.save();
}



/******************************* Venue Functions  *******************************************/

export function handleVenueAdded(event: VenueAdded): void {
  let entity = VenueList.load(event.params.tokenId.toHex());
  if (!entity) {
    entity = new VenueList(event.params.tokenId.toHex());
    entity.name = event.params.name;
    entity.location = event.params.location;
    entity.category = event.params.category;
    entity.totalCapacity = event.params.totalCapacity;
    entity.rentPerBlock = event.params.rentPerBlock;
    entity.tokenCID = event.params.tokenCID;
    entity.venueId = event.params.tokenId;
    entity.transactionHash = event.transaction.hash.toHex();
    entity.timestamp = event.block.timestamp;
    let token = BookedTime.load(event.params.tokenId.toString());
    if(!token) {
      token = new BookedTime(event.params.tokenId.toString());
      token.name = event.params.name;
      token.location = event.params.location;
      token.category = event.params.category;
      token.totalCapacity = event.params.totalCapacity;
      token.rentPerBlock = event.params.rentPerBlock;
      token.tokenCID = event.params.tokenCID;
      token.venueTokenId = event.params.tokenId;
      token.transactionHash = event.transaction.hash.toHex();
      token.timestamp = event.block.timestamp;
    }
    token.save();

  }
  entity.save();
}

export function handleRentalCommission(event: VenueRentalCommissionUpdated): void {
  let token = VenueRental.load(event.params.venueRentalCommission.toString());
  if(!token) {
    token = new VenueRental(event.params.venueRentalCommission.toString());
    token.venueRentalCommission = event.params.venueRentalCommission;
  }
  else {
    token.venueRentalCommission = event.params.venueRentalCommission;
  }
  token.save();
}

export function handleErc20Details(event: Erc20DetailsEvent): void {
  let tokenValue = Erc20TokenEvent.load(event.params.tokenAddress.toString());
  if(!tokenValue) {
    tokenValue = new Erc20TokenEvent(event.params.tokenAddress.toString());
    tokenValue.tokenName = event.params.name;
    tokenValue.tokenSymbol = event.params.symbol;
    tokenValue.tokenDecimal = event.params.decimal;
    tokenValue.tokenAddress = event.params.tokenAddress;
    let contract = conversion.bind(event.address);
    let address = contract.getBaseToken();
    let token = BaseToken.load(address.toString());
    if(!token) {
      token = new BaseToken(address.toString());
      token.baseTokenAddress = address;
      // if(address == event.params.tokenAddress) {
        token.tokenName = "Trace Test";
        token.tokenSymbol = "TT";
        token.tokenDecimal = BigInt.fromI32(18);
        
        // token.tokenName = event.params.name;
        // token.tokenSymbol = event.params.symbol;
        // token.tokenDecimal = event.params.decimal;
      //}
    }
    token.save();

  }
  else {
    tokenValue.tokenName = event.params.name;
    tokenValue.tokenSymbol = event.params.symbol;
    tokenValue.tokenDecimal = event.params.decimal;
    tokenValue.tokenAddress = event.params.tokenAddress;  
    let contract = conversion.bind(event.address);
    let address = contract.getBaseToken();
    let token = BaseToken.load(address.toString());
    if(!token) {
      token = new BaseToken(address.toString());
      token.baseTokenAddress = address;
      // if(address == event.params.tokenAddress) {
        token.tokenName = "Trace Test";
        token.tokenSymbol = "TT";
        token.tokenDecimal = BigInt.fromI32(18);
        // token.tokenName = event.params.name;
        // token.tokenSymbol = event.params.symbol;
        // token.tokenDecimal = event.params.decimal;
      //}
    }
    token.save();
  }
  tokenValue.save();
}
