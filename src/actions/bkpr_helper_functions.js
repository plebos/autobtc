export function determine_description(str, tag) {
    if (tag === "routed") {
      let desc = { type: "routed" };
      return desc;
    }
  
    try {
      let json;
      if (is_json(str) && (json = JSON.parse(str))) {
        if (json.kind === 9734) {
          let zaptype = determine_zap_type(json);
          let zap_desc = { zap_type: zaptype, zap: json, type: "zap" };
          return zap_desc;
        } else if (json.length > 0) {
          return get_lnurl_description(json);
        }
        return create_generic_desc(str);
      }
      return create_generic_desc(str);
    } catch(e) {
      return create_generic_desc(str);
    }
  }
  

export function formatAccountEventsHTML({ processedEvents }) {
    const headers = ['Timestamp', 'Type@Tag', 'Amount', 'Desc. Type', 'Fee (msat)'];
  
    const headerRow = headers.map(header => `<th>${header}</th>`).join('');
  
    const rows = processedEvents.map(event => {
      const credit = Number(event.credit);
      const debit = Number(event.debit);
      const amount = credit !== 0 ? `+${credit}sats` : `-${debit}sats`;
      const fee = event.fees_msat ? event.fees_msat : '';
      return `<tr>
        <td>${event.timestamp}</td>
        <td>${event.type}@${event.tag}</td>
        <td>${amount}</td>
        <td>${event.description.type}</td>
        <td>${fee}</td>
      </tr>`;
    });
  
    const table = `
    <table>
      <thead>
        <tr>${headerRow}</tr>
      </thead>
      <tbody>
        ${rows.join('')}
      </tbody>
    </table>`;
  
    return table;
  }
  

  
  export function formatAccountEvents({ processedEvents }) {
    const headers = ['Type@Tag', 'Amount', 'Desc. Type', 'Fee (msat)'];
  
    const rows = processedEvents.map(event => {
      const credit = parseFloat(event.credit);
      const debit = parseFloat(event.debit);
      const amount = credit !== 0 ? `+${credit.toFixed(8)} sats` : `-${debit.toFixed(8)} sats`;
      const fee = event.fee_msat ? event.fee_msat : '0';
      return [`${event.type}@${event.tag}`, amount, event.description.type, fee];
    });
  
    const formattedRows = rows.map(row => row.join('\t')).join('\n');
    const formattedHeaders = headers.join('\t');
    const formattedTable = `${formattedHeaders}\n${formattedRows}`;
  
    return formattedTable;
  }
  
function determine_zap_type(json) {
    const etag = get_tag(json.tags, "e");
    const ptag = get_tag(json.tags, "p");
  
    if (!ptag)
      return null;
  
    if (!etag) {
      let profile_zap = { pubkey: ptag, type: "profile" };
      return profile_zap;
    } 
  
    let zap_ev = { evid: etag, pubkey: ptag, type: "event" };
    return zap_ev;
  }
  
function get_tag(tags, key) {
    let v = tags.find(tag => tag[0] === key);
    return v && v[1];
  }
  
function get_lnurl_description(json) {
    const description = get_tag(json, "text/plain");
    const address = get_tag(json, "text/identifier");
    return { description, address, type: "lnurl" };
  }
  
function create_generic_desc(str) {
    return { type: "generic", value: str };
  }
  
function is_json(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  
