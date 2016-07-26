import { Mongo } from 'meteor/mongo';

const Auctionlets = new Mongo.Collection(null);

Auctionlets.getAuctionlet = function() {
    TokenAuction.objects.auction.getAuctionletInfo(Meteor.settings.public.auctionletId, function (error, result) {
      if(!error) {
        Auctionlets.remove({});
        var auctionlet = {
          auctionletId: Meteor.settings.public.auctionletId,
          auction_id: result[0].toString(10),
          last_bidder: result[1],
          last_bid_time: new Date(result[2].toNumber()*1000),
          buy_amount: result[3].toString(10),
          sell_amount: result[4].toString(10),
          unclaimed: result[5],
          base: result[6]
        };
        Auctionlets.insert(auctionlet);
      }
      else {
        console.log("auctionlet info error: ", error);
      }
    })
}

Auctionlets.bidOnAuctionlet = function(auctionletId, bidAmount, quantity) {
    TokenAuction.objects.auction.bid['uint256,uint256,uint256'](auctionletId, bidAmount, quantity, {gas: 1500000 }, function (error, result) {
        if(!error) {
          console.log(result);
        }
        else {
          console.log("error: ", error);
        }
      })
}

export { Auctionlets }