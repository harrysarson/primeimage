require('./prime_search')({}).then(Module => {
    const input =
        `27891247891427891287912487912487912498712879532870158715536548141532468235224835224851324285324283514823522483521482935284213252514134111111111111111111111111111135241111111111111111111111165132555555555555555555555555555555555555555558867348766384668434636484646836427891247891427891287912487912487912498712879532870158715536548141532468235224835224851324285324283514823522483521482935284213252514134111111111111111111111111111135241111111111111111111111165132555555555555555555555555555555555555555588673487663846684346364846468364278912478914278912879124879124879124987128795328701587155365481415324682352248352248513242853242835148235224835214829352842132525141341111111111111111111111111111352411111111111111111111111651325555555555555555555555555555555555555555588673487663846684346364846468364`;
    // TODO: allocate more memory
    const buffer = Module._malloc(input.length + 1);
    Module.stringToUTF8(input, buffer, input.length + 1);
    Module._find_candidate_stdout(buffer, 10);
    console.log(`done, result = ${Module.UTF8ToString(buffer)}`);
    Module._free(buffer);
});
