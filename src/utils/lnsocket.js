/* eslint-disable */
var Module = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(Module = {})  {

var Module=typeof Module!="undefined"?Module:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject});["_malloc","_free","_lnsocket_make_default_initmsg","_lnsocket_encrypt","_lnsocket_decrypt","_lnsocket_decrypt_header","_lnsocket_make_pong_msg","_lnsocket_make_pong_from_ping","_lnsocket_make_ping_msg","_lnsocket_msgbuf","_lnsocket_create","_lnsocket_destroy","_lnsocket_secp","_lnsocket_genkey","_lnsocket_setkey","_lnsocket_print_errors","_lnsocket_act_two","_commando_make_rpc_msg","_lnsocket_act_one","_fflush","onRuntimeInitialized"].forEach(prop=>{if(!Object.getOwnPropertyDescriptor(Module["ready"],prop)){Object.defineProperty(Module["ready"],prop,{get:()=>abort("You are getting "+prop+" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js"),set:()=>abort("You are setting "+prop+" on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js")})}});Module.getRandomValue=function(){const window_="object"===typeof window?window:this;const crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;let randomBytesNode;let fn;if(!crypto_){randomBytesNode=require("crypto").randomBytes;fn=randomValuesNode}else{fn=randomValuesStandard}function randomValuesNode(){return randomBytesNode(1)[0]>>>0}function randomValuesStandard(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0}return fn}();var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=true;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)")}var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_SHELL){if(typeof process=="object"&&typeof require==="function"||typeof window=="object"||typeof importScripts=="function")throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");if(typeof read!="undefined"){read_=f=>{return read(f)}}readBinary=f=>{let data;if(typeof readbuffer=="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data=="object");return data};readAsync=(f,onload,onerror)=>{setTimeout(()=>onload(readBinary(f)),0)};if(typeof clearTimeout=="undefined"){globalThis.clearTimeout=id=>{}}if(typeof scriptArgs!="undefined"){arguments_=scriptArgs}else if(typeof arguments!="undefined"){arguments_=arguments}if(typeof quit=="function"){quit_=(status,toThrow)=>{setTimeout(()=>{if(!(toThrow instanceof ExitStatus)){let toLog=toThrow;if(toThrow&&typeof toThrow=="object"&&toThrow.stack){toLog=[toThrow,toThrow.stack]}err("exiting due to exception: "+toLog)}quit(status)});throw toThrow}}if(typeof print!="undefined"){if(typeof console=="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!="undefined"?printErr:print}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}if(!(typeof window=="object"||typeof importScripts=="function"))throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{throw new Error("environment detection error")}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;checkIncomingModuleAPI();if(Module["arguments"])arguments_=Module["arguments"];legacyModuleProp("arguments","arguments_");if(Module["thisProgram"])thisProgram=Module["thisProgram"];legacyModuleProp("thisProgram","thisProgram");if(Module["quit"])quit_=Module["quit"];legacyModuleProp("quit","quit_");assert(typeof Module["memoryInitializerPrefixURL"]=="undefined","Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["pthreadMainPrefixURL"]=="undefined","Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["cdInitializerPrefixURL"]=="undefined","Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["filePackagePrefixURL"]=="undefined","Module.filePackagePrefixURL option was removed, use Module.locateFile instead");assert(typeof Module["read"]=="undefined","Module.read option was removed (modify read_ in JS)");assert(typeof Module["readAsync"]=="undefined","Module.readAsync option was removed (modify readAsync in JS)");assert(typeof Module["readBinary"]=="undefined","Module.readBinary option was removed (modify readBinary in JS)");assert(typeof Module["setWindowTitle"]=="undefined","Module.setWindowTitle option was removed (modify setWindowTitle in JS)");assert(typeof Module["TOTAL_MEMORY"]=="undefined","Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");legacyModuleProp("read","read_");legacyModuleProp("readAsync","readAsync");legacyModuleProp("readBinary","readBinary");legacyModuleProp("setWindowTitle","setWindowTitle");assert(!ENVIRONMENT_IS_WORKER,"worker environment detected but not enabled at build time.  Add 'worker' to `-sENVIRONMENT` to enable.");assert(!ENVIRONMENT_IS_NODE,"node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");assert(!ENVIRONMENT_IS_SHELL,"shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];legacyModuleProp("wasmBinary","wasmBinary");var noExitRuntime=Module["noExitRuntime"]||true;legacyModuleProp("noExitRuntime","noExitRuntime");if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort("Assertion failed"+(text?": "+text:""))}}var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}assert(!Module["STACK_SIZE"],"STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time");assert(typeof Int32Array!="undefined"&&typeof Float64Array!=="undefined"&&Int32Array.prototype.subarray!=undefined&&Int32Array.prototype.set!=undefined,"JS engine does not provide full typed array support");assert(!Module["wasmMemory"],"Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");assert(!Module["INITIAL_MEMORY"],"Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");var wasmTable;function writeStackCookie(){var max=_emscripten_stack_get_end();assert((max&3)==0);if(max==0){max+=4}HEAPU32[max>>2]=34821223;HEAPU32[max+4>>2]=2310721022;HEAPU32[0]=1668509029}function checkStackCookie(){if(ABORT)return;var max=_emscripten_stack_get_end();if(max==0){max+=4}var cookie1=HEAPU32[max>>2];var cookie2=HEAPU32[max+4>>2];if(cookie1!=34821223||cookie2!=2310721022){abort("Stack overflow! Stack cookie has been overwritten at "+ptrToString(max)+", expected hex dwords 0x89BACDFE and 0x2135467, but received "+ptrToString(cookie2)+" "+ptrToString(cookie1))}if(HEAPU32[0]!==1668509029){abort("Runtime error: The application has corrupted its heap memory area (address zero)!")}}(function(){var h16=new Int16Array(1);var h8=new Int8Array(h16.buffer);h16[0]=25459;if(h8[0]!==115||h8[1]!==99)throw"Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)"})();var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeKeepaliveCounter=0;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){assert(!runtimeInitialized);runtimeInitialized=true;checkStackCookie();callRuntimeCallbacks(__ATINIT__)}function postRun(){checkStackCookie();if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}assert(Math.imul,"This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");assert(Math.fround,"This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");assert(Math.clz32,"This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");assert(Math.trunc,"This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;var runDependencyTracking={};function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(id){assert(!runDependencyTracking[id]);runDependencyTracking[id]=1;if(runDependencyWatcher===null&&typeof setInterval!="undefined"){runDependencyWatcher=setInterval(()=>{if(ABORT){clearInterval(runDependencyWatcher);runDependencyWatcher=null;return}var shown=false;for(var dep in runDependencyTracking){if(!shown){shown=true;err("still waiting on run dependencies:")}err("dependency: "+dep)}if(shown){err("(end of list)")}},1e4)}}else{err("warning: run dependency added without ID")}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(id){assert(runDependencyTracking[id]);delete runDependencyTracking[id]}else{err("warning: run dependency removed without ID")}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var FS={error:function(){abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM")},init:function(){FS.error()},createDataFile:function(){FS.error()},createPreloadedFile:function(){FS.error()},createLazyFile:function(){FS.error()},open:function(){FS.error()},mkdev:function(){FS.error()},registerDevice:function(){FS.error()},analyzePath:function(){FS.error()},ErrnoError:function ErrnoError(){FS.error()}};Module["FS_createDataFile"]=FS.createDataFile;Module["FS_createPreloadedFile"]=FS.createPreloadedFile;var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}function createExportWrapper(name,fixedasm){return function(){var displayName=name;var asm=fixedasm;if(!fixedasm){asm=Module["asm"]}assert(runtimeInitialized,"native function `"+displayName+"` called before runtime initialization");if(!asm[name]){assert(asm[name],"exported native function `"+displayName+"` not found")}return asm[name].apply(null,arguments)}}var wasmBinaryFile;wasmBinaryFile="http://localhost:8000/static/lnsocket.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(binaryFile){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{if(!response["ok"]){throw"failed to load wasm binary file at '"+binaryFile+"'"}return response["arrayBuffer"]()}).catch(()=>getBinary(binaryFile))}}return Promise.resolve().then(()=>getBinary(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>{return WebAssembly.instantiate(binary,imports)}).then(instance=>{return instance}).then(receiver,reason=>{err("failed to asynchronously prepare wasm: "+reason);if(isFileURI(wasmBinaryFile)){err("warning: Loading from a file URI ("+wasmBinaryFile+") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing")}abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&typeof fetch=="function"){return fetch(binaryFile,{credentials:"same-origin"}).then(response=>{var result=WebAssembly.instantiateStreaming(response,imports);return result.then(callback,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(binaryFile,imports,callback)})})}else{return instantiateArrayBuffer(binaryFile,imports,callback)}}function createWasm(){var info={"env":wasmImports,"wasi_snapshot_preview1":wasmImports};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["memory"];assert(wasmMemory,"memory not found in wasm exports");updateMemoryViews();wasmTable=Module["asm"]["__indirect_function_table"];assert(wasmTable,"table not found in wasm exports");addOnInit(Module["asm"]["__wasm_call_ctors"]);removeRunDependency("wasm-instantiate");return exports}addRunDependency("wasm-instantiate");var trueModule=Module;function receiveInstantiationResult(result){assert(Module===trueModule,"the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");trueModule=null;receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);readyPromiseReject(e)}}instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult).catch(readyPromiseReject);return{}}var tempDouble;var tempI64;function legacyModuleProp(prop,newName){if(!Object.getOwnPropertyDescriptor(Module,prop)){Object.defineProperty(Module,prop,{configurable:true,get:function(){abort("Module."+prop+" has been replaced with plain "+newName+" (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")}})}}function ignoredModuleProp(prop){if(Object.getOwnPropertyDescriptor(Module,prop)){abort("`Module."+prop+"` was supplied but `"+prop+"` not included in INCOMING_MODULE_JS_API")}}function isExportedByForceFilesystem(name){return name==="FS_createPath"||name==="FS_createDataFile"||name==="FS_createPreloadedFile"||name==="FS_unlink"||name==="addRunDependency"||name==="FS_createLazyFile"||name==="FS_createDevice"||name==="removeRunDependency"}function missingGlobal(sym,msg){if(typeof globalThis!=="undefined"){Object.defineProperty(globalThis,sym,{configurable:true,get:function(){warnOnce("`"+sym+"` is not longer defined by emscripten. "+msg);return undefined}})}}missingGlobal("buffer","Please use HEAP8.buffer or wasmMemory.buffer");function missingLibrarySymbol(sym){if(typeof globalThis!=="undefined"&&!Object.getOwnPropertyDescriptor(globalThis,sym)){Object.defineProperty(globalThis,sym,{configurable:true,get:function(){var msg="`"+sym+"` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line";var librarySymbol=sym;if(!librarySymbol.startsWith("_")){librarySymbol="$"+sym}msg+=" (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE="+librarySymbol+")";if(isExportedByForceFilesystem(sym)){msg+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"}warnOnce(msg);return undefined}})}unexportedRuntimeSymbol(sym)}function unexportedRuntimeSymbol(sym){if(!Object.getOwnPropertyDescriptor(Module,sym)){Object.defineProperty(Module,sym,{configurable:true,get:function(){var msg="'"+sym+"' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";if(isExportedByForceFilesystem(sym)){msg+=". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you"}abort(msg)}})}}var ASM_CONSTS={70240:()=>{return Module.getRandomValue()},70276:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function ptrToString(ptr){assert(typeof ptr==="number");return"0x"+ptr.toString(16).padStart(8,"0")}function warnOnce(text){if(!warnOnce.shown)warnOnce.shown={};if(!warnOnce.shown[text]){warnOnce.shown[text]=1;err(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{if((u0&248)!=240)warnOnce("Invalid UTF-8 leading byte "+ptrToString(u0)+" encountered when deserializing a UTF-8 string in wasm memory to a JS string!");u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){assert(typeof ptr=="number");return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function ___assert_fail(condition,filename,line,func){abort("Assertion failed: "+UTF8ToString(condition)+", at: "+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])}function _abort(){abort("native code called abort()")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){assert(Array.isArray(readEmAsmArgsArray));assert(buf%16==0);readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){var chr=String.fromCharCode(ch);var validChars=["d","f","i"];assert(validChars.includes(chr),"Invalid character "+ch+'("'+chr+'") in readEmAsmArgs! Use only ['+validChars+'], and do not specify "v" for void return argument.');buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);if(!ASM_CONSTS.hasOwnProperty(code))abort("No EM_ASM constant found at address "+code);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function abortOnCannotGrowMemory(requestedSize){abort("Cannot enlarge memory arrays to size "+requestedSize+" bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value "+HEAP8.length+", (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0")}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;abortOnCannotGrowMemory(requestedSize)}var SYSCALLS={varargs:undefined,get:function(){assert(SYSCALLS.varargs!=undefined);SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_close(fd){abort("fd_close called without SYSCALLS_REQUIRE_FILESYSTEM")}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){return 70}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}function flush_NO_FILESYSTEM(){_fflush(0);if(printCharBuffers[1].length)printChar(1,10);if(printCharBuffers[2].length)printChar(2,10)}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}function writeArrayToMemory(array,buffer){assert(array.length>=0,"writeArrayToMemory array must have a length (should be an array or typed array)");HEAP8.set(array,buffer)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){assert(typeof str==="string");if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;if(u>1114111)warnOnce("Invalid Unicode code point "+ptrToString(u)+" encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){assert(typeof maxBytesToWrite=="number","stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function stringToUTF8OnStack(str){var size=lengthBytesUTF8(str)+1;var ret=stackAlloc(size);stringToUTF8(str,ret,size);return ret}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":str=>{var ret=0;if(str!==null&&str!==undefined&&str!==0){ret=stringToUTF8OnStack(str)}return ret},"array":arr=>{var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string"){return UTF8ToString(ret)}if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;assert(returnType!=="array",'Return type should not be "array".');if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);function onDone(ret){if(stack!==0)stackRestore(stack);return convertReturnValue(ret)}ret=onDone(ret);return ret}function cwrap(ident,returnType,argTypes,opts){return function(){return ccall(ident,returnType,argTypes,arguments,opts)}}function checkIncomingModuleAPI(){ignoredModuleProp("fetchSettings")}var wasmImports={"__assert_fail":___assert_fail,"abort":_abort,"emscripten_asm_const_int":_emscripten_asm_const_int,"emscripten_memcpy_big":_emscripten_memcpy_big,"emscripten_resize_heap":_emscripten_resize_heap,"fd_close":_fd_close,"fd_seek":_fd_seek,"fd_write":_fd_write};var asm=createWasm();var ___wasm_call_ctors=createExportWrapper("__wasm_call_ctors");var _malloc=Module["_malloc"]=createExportWrapper("malloc");var _free=Module["_free"]=createExportWrapper("free");var ___errno_location=createExportWrapper("__errno_location");var _lnsocket_make_default_initmsg=Module["_lnsocket_make_default_initmsg"]=createExportWrapper("lnsocket_make_default_initmsg");var _lnsocket_encrypt=Module["_lnsocket_encrypt"]=createExportWrapper("lnsocket_encrypt");var _lnsocket_decrypt=Module["_lnsocket_decrypt"]=createExportWrapper("lnsocket_decrypt");var _lnsocket_decrypt_header=Module["_lnsocket_decrypt_header"]=createExportWrapper("lnsocket_decrypt_header");var _lnsocket_make_pong_msg=Module["_lnsocket_make_pong_msg"]=createExportWrapper("lnsocket_make_pong_msg");var _lnsocket_make_pong_from_ping=Module["_lnsocket_make_pong_from_ping"]=createExportWrapper("lnsocket_make_pong_from_ping");var _lnsocket_make_ping_msg=Module["_lnsocket_make_ping_msg"]=createExportWrapper("lnsocket_make_ping_msg");var _lnsocket_msgbuf=Module["_lnsocket_msgbuf"]=createExportWrapper("lnsocket_msgbuf");var _lnsocket_create=Module["_lnsocket_create"]=createExportWrapper("lnsocket_create");var _lnsocket_destroy=Module["_lnsocket_destroy"]=createExportWrapper("lnsocket_destroy");var _htons=createExportWrapper("htons");var _lnsocket_secp=Module["_lnsocket_secp"]=createExportWrapper("lnsocket_secp");var _lnsocket_genkey=Module["_lnsocket_genkey"]=createExportWrapper("lnsocket_genkey");var _lnsocket_setkey=Module["_lnsocket_setkey"]=createExportWrapper("lnsocket_setkey");var _lnsocket_print_errors=Module["_lnsocket_print_errors"]=createExportWrapper("lnsocket_print_errors");var _lnsocket_act_two=Module["_lnsocket_act_two"]=createExportWrapper("lnsocket_act_two");var _commando_make_rpc_msg=Module["_commando_make_rpc_msg"]=createExportWrapper("commando_make_rpc_msg");var _lnsocket_act_one=Module["_lnsocket_act_one"]=createExportWrapper("lnsocket_act_one");var _fflush=Module["_fflush"]=createExportWrapper("fflush");var _htonl=createExportWrapper("htonl");var _ntohs=createExportWrapper("ntohs");var _emscripten_stack_init=function(){return(_emscripten_stack_init=Module["asm"]["emscripten_stack_init"]).apply(null,arguments)};var _emscripten_stack_get_free=function(){return(_emscripten_stack_get_free=Module["asm"]["emscripten_stack_get_free"]).apply(null,arguments)};var _emscripten_stack_get_base=function(){return(_emscripten_stack_get_base=Module["asm"]["emscripten_stack_get_base"]).apply(null,arguments)};var _emscripten_stack_get_end=function(){return(_emscripten_stack_get_end=Module["asm"]["emscripten_stack_get_end"]).apply(null,arguments)};var stackSave=createExportWrapper("stackSave");var stackRestore=createExportWrapper("stackRestore");var stackAlloc=createExportWrapper("stackAlloc");var _emscripten_stack_get_current=function(){return(_emscripten_stack_get_current=Module["asm"]["emscripten_stack_get_current"]).apply(null,arguments)};var dynCall_iiiji=Module["dynCall_iiiji"]=createExportWrapper("dynCall_iiiji");var dynCall_iiij=Module["dynCall_iiij"]=createExportWrapper("dynCall_iiij");var dynCall_iijii=Module["dynCall_iijii"]=createExportWrapper("dynCall_iijii");var dynCall_iiijiji=Module["dynCall_iiijiji"]=createExportWrapper("dynCall_iiijiji");var dynCall_iiijiii=Module["dynCall_iiijiii"]=createExportWrapper("dynCall_iiijiii");var dynCall_jiji=Module["dynCall_jiji"]=createExportWrapper("dynCall_jiji");Module["ccall"]=ccall;Module["cwrap"]=cwrap;var missingLibrarySymbols=["zeroMemory","exitJS","emscripten_realloc_buffer","isLeapYear","ydayFromDate","arraySum","addDays","setErrNo","inetPton4","inetNtop4","inetPton6","inetNtop6","readSockaddr","writeSockaddr","getHostByName","initRandomFill","randomFill","traverseStack","getCallstack","emscriptenLog","convertPCtoSourceLocation","runMainThreadEmAsm","jstoi_q","jstoi_s","getExecutableName","listenOnce","autoResumeAudioContext","dynCallLegacy","getDynCaller","dynCall","setWasmTableEntry","getWasmTableEntry","handleException","runtimeKeepalivePush","runtimeKeepalivePop","callUserCallback","maybeExit","safeSetTimeout","asmjsMangle","asyncLoad","alignMemory","mmapAlloc","HandleAllocator","getNativeTypeSize","STACK_SIZE","STACK_ALIGN","POINTER_SIZE","ASSERTIONS","writeI53ToI64","writeI53ToI64Clamped","writeI53ToI64Signaling","writeI53ToU64Clamped","writeI53ToU64Signaling","readI53FromI64","readI53FromU64","convertI32PairToI53","convertU32PairToI53","uleb128Encode","sigToWasmTypes","generateFuncType","convertJsFunctionToWasm","getEmptyTableSlot","updateTableMap","getFunctionAddress","addFunction","removeFunction","reallyNegative","unSign","strLen","reSign","formatString","intArrayFromString","intArrayToString","AsciiToString","stringToAscii","UTF16ToString","stringToUTF16","lengthBytesUTF16","UTF32ToString","stringToUTF32","lengthBytesUTF32","stringToNewUTF8","getSocketFromFD","getSocketAddress","registerKeyEventCallback","maybeCStringToJsString","findEventTarget","findCanvasEventTarget","getBoundingClientRect","fillMouseEventData","registerMouseEventCallback","registerWheelEventCallback","registerUiEventCallback","registerFocusEventCallback","fillDeviceOrientationEventData","registerDeviceOrientationEventCallback","fillDeviceMotionEventData","registerDeviceMotionEventCallback","screenOrientation","fillOrientationChangeEventData","registerOrientationChangeEventCallback","fillFullscreenChangeEventData","registerFullscreenChangeEventCallback","JSEvents_requestFullscreen","JSEvents_resizeCanvasForFullscreen","registerRestoreOldStyle","hideEverythingExceptGivenElement","restoreHiddenElements","setLetterbox","softFullscreenResizeWebGLRenderTarget","doRequestFullscreen","fillPointerlockChangeEventData","registerPointerlockChangeEventCallback","registerPointerlockErrorEventCallback","requestPointerLock","fillVisibilityChangeEventData","registerVisibilityChangeEventCallback","registerTouchEventCallback","fillGamepadEventData","registerGamepadEventCallback","registerBeforeUnloadEventCallback","fillBatteryEventData","battery","registerBatteryEventCallback","setCanvasElementSize","getCanvasElementSize","demangle","demangleAll","jsStackTrace","stackTrace","getEnvStrings","checkWasiClock","wasiRightsToMuslOFlags","wasiOFlagsToMuslOFlags","createDyncallWrapper","setImmediateWrapped","clearImmediateWrapped","polyfillSetImmediate","getPromise","makePromise","idsToPromises","makePromiseCallback","ExceptionInfo","setMainLoop","_setNetworkCallback","heapObjectForWebGLType","heapAccessShiftForWebGLHeap","webgl_enable_ANGLE_instanced_arrays","webgl_enable_OES_vertex_array_object","webgl_enable_WEBGL_draw_buffers","webgl_enable_WEBGL_multi_draw","emscriptenWebGLGet","computeUnpackAlignedImageSize","colorChannelsInGlTextureFormat","emscriptenWebGLGetTexPixelData","__glGenObject","emscriptenWebGLGetUniform","webglGetUniformLocation","webglPrepareUniformLocationsBeforeFirstUse","webglGetLeftBracePos","emscriptenWebGLGetVertexAttrib","__glGetActiveAttribOrUniform","writeGLArray","registerWebGlEventCallback","runAndAbortIfError","SDL_unicode","SDL_ttfContext","SDL_audio","GLFW_Window","ALLOC_NORMAL","ALLOC_STACK","allocate","writeStringToMemory","writeAsciiToMemory"];missingLibrarySymbols.forEach(missingLibrarySymbol);var unexportedSymbols=["run","addOnPreRun","addOnInit","addOnPreMain","addOnExit","addOnPostRun","addRunDependency","removeRunDependency","FS_createFolder","FS_createPath","FS_createDataFile","FS_createPreloadedFile","FS_createLazyFile","FS_createLink","FS_createDevice","FS_unlink","out","err","callMain","abort","keepRuntimeAlive","wasmMemory","stackAlloc","stackSave","stackRestore","getTempRet0","setTempRet0","writeStackCookie","checkStackCookie","ptrToString","getHeapMax","abortOnCannotGrowMemory","ENV","MONTH_DAYS_REGULAR","MONTH_DAYS_LEAP","MONTH_DAYS_REGULAR_CUMULATIVE","MONTH_DAYS_LEAP_CUMULATIVE","ERRNO_CODES","ERRNO_MESSAGES","DNS","Protocols","Sockets","timers","warnOnce","UNWIND_CACHE","readEmAsmArgsArray","readEmAsmArgs","runEmAsmFunction","convertI32PairToI53Checked","getCFunc","freeTableIndexes","functionsInTableMap","setValue","getValue","PATH","PATH_FS","UTF8Decoder","UTF8ArrayToString","UTF8ToString","stringToUTF8Array","stringToUTF8","lengthBytesUTF8","UTF16Decoder","stringToUTF8OnStack","writeArrayToMemory","SYSCALLS","JSEvents","specialHTMLTargets","currentFullscreenStrategy","restoreOldWindowedStyle","ExitStatus","flush_NO_FILESYSTEM","dlopenMissingError","promiseMap","uncaughtExceptionCount","exceptionLast","exceptionCaught","Browser","wget","FS","MEMFS","TTY","PIPEFS","SOCKFS","tempFixedLengthArray","miniTempWebGLFloatBuffers","miniTempWebGLIntBuffers","GL","emscripten_webgl_power_preferences","AL","GLUT","EGL","GLEW","IDBStore","SDL","SDL_gfx","GLFW","allocateUTF8","allocateUTF8OnStack"];unexportedSymbols.forEach(unexportedRuntimeSymbol);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function stackCheckInit(){_emscripten_stack_init();writeStackCookie()}function run(){if(runDependencies>0){return}stackCheckInit();preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();assert(!Module["_main"],'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}checkStackCookie()}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();


  return Module.ready
}

);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = Module;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return Module; });
else if (typeof exports === 'object')
  exports["Module"] = Module;

async function lnsocket_init() {
	const module = await Module()

	function SocketImpl(host) {
		if (!(this instanceof SocketImpl))
			return new SocketImpl(host)

		if (typeof WebSocket !== 'undefined') {
			console.log("WebSocket", typeof WebSocket)
			const ok = host.startsWith("ws://") || host.startsWith("wss://")
			if (!ok)
				throw new Error("host must start with ws:// or wss://")
			const ws = new WebSocket(host)
			ws.ondata = function(fn) {
				ws.onmessage = (v) => {
					const data = v.data.arrayBuffer()
					fn(data)
				}
			}
			return ws
		}

		//
		// we're in nodejs
		//
		const net = require('net')
		let [hostname,port] = host.split(":")
		port = +port || 9735
		const socket = net.createConnection(port, hostname, () => {
			socket.emit("open")
		})
		socket.addEventListener = socket.on.bind(socket)

		if (socket.onmessage)
			throw new Error("socket already has onmessage?")

		socket.ondata = (fn) => {
			socket.on('data', fn)
		}

		socket.close = () => {
			socket.destroy()
		}

		if (socket.send)
			throw new Error("socket already has send?")

		socket.send = function socket_send(data) {
			return new Promise((resolve, reject) => {
				socket.write(data, resolve)
			});
		}

		return socket
	}

	const ACT_ONE_SIZE = 50
	const ACT_TWO_SIZE = 50
	const ACT_THREE_SIZE = 66
	const DEFAULT_TIMEOUT = 15000

	const COMMANDO_REPLY_CONTINUES = 0x594b
	const COMMANDO_REPLY_TERM = 0x594d

	const lnsocket_create = module.cwrap("lnsocket_create", "number")
	const lnsocket_destroy = module.cwrap("lnsocket_destroy", "number")
	const lnsocket_encrypt = module.cwrap("lnsocket_encrypt", "number", ["int", "array", "int", "int"])
	const lnsocket_decrypt = module.cwrap("lnsocket_decrypt", "number", ["int", "array", "int"])
	const lnsocket_decrypt_header = module.cwrap("lnsocket_decrypt_header", "number", ["number", "array"])
	const lnsocket_msgbuf = module.cwrap("lnsocket_msgbuf", "number", ["int"])
	const lnsocket_act_one = module.cwrap("lnsocket_act_one", "number", ["number", "string"])
	const lnsocket_act_two = module.cwrap("lnsocket_act_two", "number", ["number", "array"])
	const lnsocket_print_errors = module.cwrap("lnsocket_print_errors", "int")
	const lnsocket_genkey = module.cwrap("lnsocket_genkey", null, ["number"])
	const lnsocket_setkey = module.cwrap("lnsocket_setkey", "number", ["number", "array"])
	const lnsocket_make_default_initmsg = module.cwrap("lnsocket_make_default_initmsg", "int", ["int", "int"])
	const lnsocket_make_ping_msg = module.cwrap("lnsocket_make_ping_msg", "int", ["int", "int", "int", "int"])
	const commando_make_rpc_msg = module.cwrap("commando_make_rpc_msg", "int", ["string", "string", "string", "number", "int", "int"])

	function concat_u8_arrays(arrays) {
		// sum of individual array lengths
		let totalLength = arrays.reduce((acc, value) =>
			acc + (value.length || value.byteLength)
		, 0);

		if (!arrays.length) return null;

		let result = new Uint8Array(totalLength);

		let length = 0;
		for (let array of arrays) {
			if (array instanceof ArrayBuffer)
				result.set(new Uint8Array(array), length);
			else
				result.set(array, length);

			length += (array.length || array.byteLength);
		}

		return result;
	}

	function parse_msgtype(buf) {
		return buf[0] << 8 | buf[1]
	}

	function wasm_free(buf) {
		module._free(buf);
	}

	function char_to_hex(cstr) {
		const c = cstr.charCodeAt(0)
		// c >= 0 && c <= 9
		if (c >= 48 && c <= 57) {
			return c - 48;
		}
		// c >= a && c <= f
		if (c >= 97 && c <= 102) {
			return c - 97 + 10;
		}
		// c >= A && c <= F
		if (c >= 65 && c <= 70) {
			return c - 65 + 10;
		}
		return -1;
	}


	function hex_decode(str, buflen)
	{
		let bufsize = buflen || 33
		let c1, c2
		let i = 0
		let j = 0
		let buf = new Uint8Array(bufsize)
		let slen = str.length
		while (slen > 1) {
			if (-1==(c1 = char_to_hex(str[j])) || -1==(c2 = char_to_hex(str[j+1])))
				return null;
			if (!bufsize)
				return null;
			j += 2
			slen -= 2
			buf[i++] = (c1 << 4) | c2
			bufsize--;
		}

		return buf
	}

	function wasm_alloc(len) {
		const buf = module._malloc(len);
		module.HEAPU8.set(Uint8Array, buf);
		return buf
	}

	function wasm_mem(ptr, size) {
		return new Uint8Array(module.HEAPU8.buffer, ptr, size);
	}

	class LNSocket {
		constructor(opts) {
			if (!(this instanceof LNSocket))
				return new LNSocket(opts);

			this.opts = opts || {
				timeout: DEFAULT_TIMEOUT
			};
			this.queue = [];
			this.ln = lnsocket_create();
		}
		queue_recv() {
			let self = this;
			return new Promise((resolve, reject) => {
				const checker = setInterval(() => {
					const val = self.queue.shift();
					if (val) {
						clearInterval(checker);
						resolve(val);
					} else if (!self.connected) {
						clearInterval(checker);
						reject();
					}
				}, 5);
			});
		}
		print_errors() {
			lnsocket_print_errors(this.ln);
		}
		genkey() {
			lnsocket_genkey(this.ln);
		}
		setkeyraw(rawkey) {
			return lnsocket_setkey(this.ln, rawkey);
		}
		setkey(key) {
			const rawkey = hex_decode(key);
			return this.setkeyraw(rawkey);
		}
		act_one_data(node_id) {
			const act_one_ptr = lnsocket_act_one(this.ln, node_id);
			if (act_one_ptr === 0)
				return null;
			return wasm_mem(act_one_ptr, ACT_ONE_SIZE);
		}
		act_two(act2) {
			const act_three_ptr = lnsocket_act_two(this.ln, new Uint8Array(act2));
			if (act_three_ptr === 0) {
				this.print_errors();
				return null;
			}
			return wasm_mem(act_three_ptr, ACT_THREE_SIZE);
		}
		async connect(node_id, host) {
			await handle_connect(this, node_id, host);

			const act1 = this.act_one_data(node_id);
			this.ws.send(act1);
			const act2 = await this.read_all(ACT_TWO_SIZE);
			if (act2.length != ACT_TWO_SIZE) {
				throw new Error(`expected act2 to be ${ACT_TWO_SIZE} long, got ${act2.length}`);
			}
			const act3 = this.act_two(act2);
			this.ws.send(act3);
		}
		async connect_and_init(node_id, host) {
			await this.connect(node_id, host);
			await this.perform_init();
		}
		async read_all(n) {
			let count = 0;
			let chunks = [];
			if (!this.connected)
				throw new Error("read_all: not connected");
			while (true) {
				let res = await this.queue_recv();

				const remaining = n - count;

				if (res.byteLength > remaining) {
					chunks.push(res.slice(0, remaining));
					this.queue.unshift(res.slice(remaining));
					break;
				} else if (res.byteLength === remaining) {
					chunks.push(res);
					break;
				}

				chunks.push(res);
				count += res.byteLength;
			}

			return concat_u8_arrays(chunks);
		}
		async read_header() {
			const header = await this.read_all(18);
			if (header.length != 18)
				throw new Error("Failed to read header");
			return lnsocket_decrypt_header(this.ln, header);
		}
		async rpc(opts) {
			const msg = this.make_commando_msg(opts);
			this.write(msg);
			const res = await this.read_all_rpc();
			return JSON.parse(res);
		}
		async recv() {
			const msg = await this.read();
			const msgtype = parse_msgtype(msg.slice(0, 2));
			const res = [msgtype, msg.slice(2)];
			return res;
		}
		async read_all_rpc() {
			let chunks = [];
			while (true) {
				const [typ, msg] = await this.recv();
				switch (typ) {
					case COMMANDO_REPLY_TERM:
						chunks.push(msg.slice(8));
						return new TextDecoder().decode(concat_u8_arrays(chunks));
					case COMMANDO_REPLY_CONTINUES:
						chunks.push(msg.slice(8));
						break;
					default:
						console.log("got unknown type", typ);
						continue;
				}
			}
		}
		make_commando_msg(opts) {
			const buflen = 4096;
			let len = 0;
			const buf = wasm_alloc(buflen);

			const params = JSON.stringify(opts.params || {});
			if (!(len = commando_make_rpc_msg(opts.method, params, opts.rune,
				0, buf, buflen))) {
				throw new Error("couldn't make commando msg");
			}

			const dat = wasm_mem(buf, len);
			wasm_free(buf);
			return dat;
		}
		make_ping_msg(num_pong_bytes = 1, ignored_bytes = 1) {
			const buflen = 32;
			let len = 0;
			const buf = wasm_alloc(buflen);

			if (!(len = lnsocket_make_ping_msg(buf, buflen, num_pong_bytes, ignored_bytes)))
				throw new Error("couldn't make ping msg");

			const dat = wasm_mem(buf, len);
			wasm_free(buf);
			return dat;
		}
		encrypt(dat) {
			const len = lnsocket_encrypt(this.ln, dat, dat.length);
			if (len === 0) {
				this.print_errors();
				throw new Error("encrypt error");
			}
			const enc = wasm_mem(lnsocket_msgbuf(this.ln), len);
			return enc;
		}
		decrypt(dat) {
			const len = lnsocket_decrypt(this.ln, dat, dat.length);
			if (len === 0) {
				this.print_errors();
				throw new Error("decrypt error");
			}
			return wasm_mem(lnsocket_msgbuf(this.ln), len);
		}
		write(dat) {
			this.ws.send(this.encrypt(dat));
		}
		async read() {
			const size = await this.read_header();
			const enc = await this.read_all(size + 16);
			return this.decrypt(enc);
		}
		make_default_initmsg() {
			const buflen = 1024;
			let len = 0;
			const buf = module._malloc(buflen);
			module.HEAPU8.set(Uint8Array, buf);

			if (!(len = lnsocket_make_default_initmsg(buf, buflen)))
				throw new Error("couldn't make initmsg");

			const dat = wasm_mem(buf, len);
			module._free(buf);
			return dat;
		}
		async perform_init() {
			await this.read();
			const our_init = this.make_default_initmsg();
			this.write(our_init);
		}
		async ping_pong() {
			const pingmsg = this.make_ping_msg();
			this.write(pingmsg);
			return await this.read();
		}
		disconnect() {
			if (this.connected === true && this.ws) {
				this.ws.close();
				return true;
			}
			return false;
		}
		destroy() {
			this.disconnect();
			lnsocket_destroy(this.ln);
		}
	}


























	function handle_connect(ln, node_id, host) {
		const ws = new SocketImpl(host)
		return new Promise((resolve, reject) => {
			const timeout = ln.opts.timeout || DEFAULT_TIMEOUT
			const timer = setTimeout(reject, timeout);

			ws.ondata((v) => {
				ln.queue.push(v)
			});

			ws.addEventListener('open', function(ev) {
				ln.ws = ws
				ln.connected = true
				clearTimeout(timer)
				resolve(ws)
			});

			ws.addEventListener('close', function(ev) {
				ln.connected = false
			});
		})
	}

	return LNSocket
}

Module.init = Module.lnsocket_init = lnsocket_init
