export function preprocess_listpeers(data) {
  const peers = data.peers;
  const processedData = [];
  let totalPeers = 0;
  let peersWithChannels = 0;
  
  for (const item of peers) {
    totalPeers++;

    const peer_id = item.id;
    const connected = item.connected;
    const netaddr = item.netaddr;
    const channels = item.channels.filter(channel => !channel.private);
    const num_channels = channels.length;

    if (num_channels > 0) {
      peersWithChannels++;
      let total_msat_sum = 0;
      let feebase_msat_sum = 0;
      let feeproportional_msat_sum = 0;

      const channelInfoList = channels.map(channel => {
        total_msat_sum += channel.total_msat;
        feebase_msat_sum += channel.fee_base_msat;
        feeproportional_msat_sum += channel.fee_proportional_millionths;

        return {
          channel_id: channel.short_channel_id,
          total_msat: channel.total_msat,
          feebase_msat: channel.fee_base_msat,
          feeproportional_msat: channel.fee_proportional_millionths
        };
      });

      const total_msat_avg = total_msat_sum / num_channels;
      const feebase_msat_avg = feebase_msat_sum / num_channels;
      const feeproportional_msat_avg = feeproportional_msat_sum / num_channels;

      const truncatedPeerId = peer_id.length > 20 ? `${peer_id.slice(0, 10)}..${peer_id.slice(-10)}` : peer_id;
      const desc = `Peer ${truncatedPeerId}, ${
        connected ? "connected" : "not connected"
      }`;

      processedData.push({
        desc,
        channels: channelInfoList,
        total_msat_sum: {
          value: total_msat_sum,
          description: 'Sum of total_msat for all channels of the peer'
        },
        total_msat_avg: {
          value: total_msat_avg,
          description: 'Average of total_msat for all channels of the peer'
        },
        feebase_msat_avg: {
          value: feebase_msat_avg,
          description: 'Average of feebase_msat for all channels of the peer'
        },
        feeproportional_msat_avg: {
          value: feeproportional_msat_avg,
          description: 'Average of feeproportional_msat for all channels of the peer'
        }
      });
    }
  }
  const summary = {
    total_peers: {
      value: totalPeers,
      description: 'Total number of peers, including those without channels'
    },
    peers_with_channels: {
      value: peersWithChannels,
      description: 'Number of peers that have at least one channel'
    }
  };

  return { summary, processedData };
}

  

  export function preprocess_getinfo(data) {
    const processedData = { ...data };
  
    // Replace IP addresses and ports with dummy values
    processedData.address = processedData.address.map((addressInfo) => ({
      ...addressInfo,
      address: addressInfo.type === 'ipv4' ? '0.0.0.0' : '0000:0000:0000:0000:0000:0000:0000:0000',
      port: 65535,
    }));
  
    processedData.binding = processedData.binding.map((bindingInfo) => ({
      ...bindingInfo,
      address: bindingInfo.type === 'ipv4' ? '0.0.0.0' : '0000:0000:0000:0000:0000:0000:0000:0000',
      port: 65535,
    }));
  
    // Replace the path with a dummy value
    processedData.lightning_dir = "/path/to/dummy/lightning/dir";
    processedData.our_features.lightning_dir = "/path/to/dummy/lightning/dir";
    
    
    return processedData;
  }
  