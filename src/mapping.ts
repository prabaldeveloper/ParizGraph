import { BigInt } from "@graphprotocol/graph-ts";
import {
  VenueAdded,
  ERC20TokenUpdated,
} from "../generated/Venue/Venue";

import {
  Erc20Details as Erc20DetailsEvent,
} from "../generated/TokenDetails/TokenDetails";


import { VenueList, Erc20TokenVenue, EventList, WhiteList, Erc20TokenEvent, Favourite, BookedTime } from "../generated/schema";

import {
  events as eventsContract,
  EventAdded as EventAdded,
  DescriptionUpdated as DescriptionUpdatedEvent,
  StartTimeupdated as StartTimeupdatedEvent,
  TokenIPFSPathUpdated as TokenIPFSPathUpdatedEvent,
  Featured as FeaturedEvent,
  WhiteList as WhiteListEvent,
  ERC20TokenUpdated as Erc20TokenUpdatedEvent,
  Joined as JoinedEvent,
  Bought as BoughtEvent,
  Favourite as FavouriteEvent,
  
} from "../generated/events/events";


export function handleEventAdded(event: EventAdded): void {
  let token = EventList.load(event.params.tokenId.toString());
  if (!token) {
    token = new EventList(event.params.tokenId.toString());
    token.eventTokenId = event.params.tokenId;
    token.venueTokenId = event.params.venueTokenId;
    token.eventName = event.params.name;
    token.eventCategory = event.params.category;
    token.eventDescription = event.params.description;
    token.eventStartTime = event.params.startTime;
    token.eventEndTime = event.params.endTime;
    token.tokenCID = event.params.tokenCID;
    token.isVenueFeesPaid = event.params.isVenueFeesPaid;
    token.isPaid = event.params.isEventPaid;
    token.ticketPrice = event.params.ticketPrice;
    token.transactionHash = event.transaction.hash.toHexString();
    token.timestamp = event.block.timestamp;
    token.eventOrganiserAddress = event.params.eventOrganiser;
    token.isFeatured = false;
    token.eventStatus = "Plan to go";
  }
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
      tokenValue.eventStartTime = eventStartTimes.concat([event.params.startTime]);
    }
    else {
      let eventStartTimes = tokenValue.eventStartTime;
      tokenValue.eventStartTime = eventStartTimes.concat([event.params.startTime]);
    }

    if(tokenValue.eventEndTime.length== 0 ) {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([event.params.endTime]);
    }
    else {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([event.params.endTime]);
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
      tokenValue.eventStartTime = eventStartTimes.concat([event.params.startTime]);
    }
    else {
      let eventStartTimes = tokenValue.eventStartTime;
      tokenValue.eventStartTime = eventStartTimes.concat([event.params.startTime]);
    }

    if(tokenValue.eventEndTime.length== 0 ) {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([event.params.endTime]);
    }
    else {
      let eventEndTimes = tokenValue.eventEndTime;
      tokenValue.eventEndTime = eventEndTimes.concat([event.params.endTime]);
    }
  }
  tokenValue.save();
  
}

export function handleDescriptionUpdated(event: DescriptionUpdatedEvent): void {
  let token = EventList.load(event.params.tokenId.toString());
  if (!token) {
    token = new EventList(event.params.tokenId.toString());
    token.eventTokenId = event.params.tokenId;
    token.eventDescription = event.params.description;
  }
  token.save();
}

export function handleIPFSPathUpdated(event: TokenIPFSPathUpdatedEvent): void {
  let token = EventList.load(event.params.tokenId.toString());
  if (!token) {
    token = new EventList(event.params.tokenId.toString());
    token.eventTokenId = event.params.tokenId;
    token.tokenCID = event.params.tokenCID;
  }
  token.save();
}

export function handleStartTimeUpdated(event: StartTimeupdatedEvent): void {
  let token = EventList.load(event.params.tokenId.toString());
  if (!token) {
    token = new EventList(event.params.tokenId.toString());
    token.eventTokenId = event.params.tokenId;
    token.eventStartTime = event.params.startTime;
  }
  token.save();
}

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
  let token = WhiteList.load(event.params.whiteListedAddress.toString());
  if (!token) {
    token = new WhiteList(event.params.whiteListedAddress.toString());
    token.userAddress =event.params.whiteListedAddress;
    token.status = event.params._status;
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

export function handleJoined(event: JoinedEvent): void {
  let token = EventList.load(event.params.tokenId.toString());
  if(token) {
    if(token.participantsList.length == 0) {
      let userAddress = token.participantsList;
      token.participantsList = userAddress.concat([event.params.user]);
    }
    else {
      let userAddress = token.participantsList;
      token.participantsList = userAddress.concat([event.params.user]);
    }
    token.save();
  }
}

export function handleBought(event: BoughtEvent): void {
  let token = EventList.load(event.params.tokenId.toString());
  if(token) {
    if(token.ticketBoughtAddress.length == 0) {
      let userAddress = token.ticketBoughtAddress;
      token.participantsList = userAddress.concat([event.params.buyer]);
    }
    else {
      let userAddress = token.ticketBoughtAddress;
      token.ticketBoughtAddress = userAddress.concat([event.params.buyer]);
    }
    token.save();
  }
}

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


/******************************* Venue Functions  *******************************************/

export function handleVenueAdded(event: VenueAdded): void {
  let entity = VenueList.load(event.params.tokenId.toHex());
  if (!entity) {
    entity = new VenueList(event.params.tokenId.toHex());
    entity.name = event.params.name;
    entity.location = event.params.location;
    entity.category = event.params.category;
    entity.totalCapacity = event.params.totalCapacity;
    entity.rentalAmount = event.params.rentalAmount;
    entity.tokenCID = event.params.tokenCID;
    entity.venueId = event.params.tokenId;
    entity.transactionHash = event.transaction.hash.toHex();
    entity.timestamp = event.block.timestamp;
  }
  entity.save();
}

export function handleErc20TokenUpdatedVenue(event: ERC20TokenUpdated): void {
  let tokenDetail = Erc20TokenVenue.load(event.params.tokenAddress.toString());
  if(!tokenDetail) {
    tokenDetail = new Erc20TokenVenue(event.params.tokenAddress.toString());
    tokenDetail.tokenAddress = event.params.tokenAddress;
    tokenDetail.status = event.params.status;
  }
  else {
    tokenDetail.status = event.params.status;
    tokenDetail.tokenAddress = event.params.tokenAddress;
  }
  tokenDetail.save();
 
}

export function handleErc20Details(event: Erc20DetailsEvent): void {
  let token = Erc20TokenVenue.load(event.params.tokenAddress.toString());
  let tokenValue = Erc20TokenEvent.load(event.params.tokenAddress.toString());
  if(!token) {
    token = new Erc20TokenVenue(event.params.tokenAddress.toString());
    token.tokenName = event.params.name;
    token.tokenSymbol = event.params.symbol;
    token.tokenDecimal = event.params.decimal;
    token.tokenAddress = event.params.tokenAddress;
  }
  else {
    token.tokenName = event.params.name;
    token.tokenSymbol = event.params.symbol;
    token.tokenDecimal = event.params.decimal;
    token.tokenAddress = event.params.tokenAddress;  
  }
  
  if(!tokenValue) {
    tokenValue = new Erc20TokenEvent(event.params.tokenAddress.toString());
    tokenValue.tokenName = event.params.name;
    tokenValue.tokenSymbol = event.params.symbol;
    tokenValue.tokenDecimal = event.params.decimal;
    tokenValue.tokenAddress = event.params.tokenAddress;
  }
  else {
    tokenValue.tokenName = event.params.name;
    tokenValue.tokenSymbol = event.params.symbol;
    tokenValue.tokenDecimal = event.params.decimal;
    tokenValue.tokenAddress = event.params.tokenAddress;  
  }
  tokenValue.save();
  token.save();
}
