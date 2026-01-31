const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 5000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Minimal Positive & Negative Test Cases
const TEST_DATA = {
  positive: [
    // {
    //   tcId: 'Pos_Fun_001',
    //   name: 'Short daily greeting question',
    //   input: 'adha dhavasa kohomadha?',
    //   expected: 'අද දවස කොහොමද?'
    // },
    // {
    //   tcId: 'Pos_Fun_002',
    //   name: 'Simple food request',
    //   input: 'mata kanna monahari dhenna',
    //   expected: 'මට කන්න මොනහරි දෙන්න'
    // },
    // {
    //   tcId: 'Pos_Fun_003',
    //   name: 'Responses',
    //   input: 'hari, mama oyaata udhavu karannam',
    //   expected: 'හරි, මම ඔයාට උදවු කරන්නම්'
    // },
    // {
    //   tcId: 'Pos_Fun_004',
    //   name: 'Negative forms',
    //   input: 'ee kathaava hari lassanayi. oyaa eeka hariyata kiyavalaa naehae.',
    //   expected: 'ඒ කතාව හරි ලස්සනයි. ඔයා ඒක හරියට කියවලා නැහැ.'
    // },
    // {
    //   tcId: 'Pos_Fun_005',
    //   name: 'Common greeting',
    //   input: 'aayuboovan! obava saadharayen vaedasatahanata piLigannavaa',
    //   expected: 'ආයුබෝවන්! ඔබව සාදරයෙන් වැඩසටහනට පිළිගන්නවා'
    // },
    // {
    //   tcId: 'Pos_Fun_006',
    //   name: 'Paragraph-style input',
    //   input: 'adha dhavasama mama campus vaeda karala gedhara aavaa. loku mahansiyak thibuna nisaa podi nidahasak hoyanna hithunaa. ammaa tea ekak hadhala dhunnaa, ehema velavata hithata loku saenasiimak dhaenenavaa. raee venakota podi music ekak ahagena paadam karanna try kalaa. eeka saarThakayi. paadam tika hariyata karaganna puluvan unaa, eka nisaa hithata loku sathutak dhaenenavaa. adha dhavasa hari lassanayi kiyala hithunaa. mama adha dhavasata sthuuthivantha venavaa.',
    //   expected: 'අද දවසම මම campus වැඩ කරල ගෙදර ආවා. ලොකු මහන්සියක් තිබුන නිසා පොඩි නිඩහසක් හොයන්න හිතුනා. අම්මා tea එකක් හදල දුන්නා, එහෙම වෙලවට හිතට ලොකු සැනසීමක් දැනෙනවා. රෑ වෙනකොට පොඩි music එකක් අහගෙන පාඩම් කරන්න try කලා. ඒක සාර්ථකයි. පාඩම් ටික හරියට කරගන්න පුලුවන් උනා, එක නිසා හිතට ලොකු සතුටක් දැනෙනවා. අද දවස හරි ලස්සනයි කියල හිතුනා. මම අද දවසට ස්තූතිවන්ත වෙනවා.'
    // },
    // {
    //   tcId: 'Pos_Fun_007',
    //   name: 'Singular/plural usage and pronoun variations',
    //   input: 'mama gedhara yanna hadhannee. Oyath enavadha apee gedhara?',
    //   expected: 'මම ගෙදර යන්න හදන්නේ. ඔයත් එනවද අපේ ගෙදර?'
    // },
    // {
    //   tcId: 'Pos_Fun_008',
    //   name: 'Tense variations-Future',
    //   input: 'api labana sathiyee gaallee yanna inne',
    //   expected: 'අපි ලබන සතියේ ගාල්ලේ යන්න ඉන්නේ'
    // },
    // {
    //   tcId: 'Pos_Fun_009',
    //   name: 'Tense variations-Past',
    //   input: 'mama iiyee vandhanaa gamanak giyaa',
    //   expected: 'මම ඊයේ වන්දනා ගමනක් ගියා'
    // },
    // {
    //   tcId: 'Pos_Fun_010',
    //   name: 'Tense variations-Present',
    //   input: 'mama dhaen kana gaman inne.',
    //   expected: 'මම දැන් කන ගමන් ඉන්නේ.'
    // },
    
  ],
  negative: [
    {
      tcId: 'Neg_Fun_001',
      name: 'Missing space between words',
      input: 'mamakadeeinnee',
      expected: 'මම කඩේ ඉන්නේ'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Joined compound words',
      input: 'apimeegaenapassekathakaramu',
      expected: 'අපි මේ ගැන පස්සේ කතා කරමු'
    },
    {
    tcId: 'Neg_Fun_003',
    name: 'Line break in sentence',
    input: 'api game\ngahamu',
    expected: 'අපි game ගහමු',
  },
  {
    tcId: 'Neg_Fun_004',
    name: 'Abbreviation in instruction',
    input: 'mata ASAP oyagen wedak kara ganna one',
    expected: 'මට ASAP ඔයගෙන් වැඩක් කර ගන්න ඕනෙ',
  },
  {
    tcId: 'Neg_Fun_005',
    name: 'Extra spaces in request',
    input: 'mama     ammaava    pudhuma     kaLaa',
    expected: 'මම අම්මාව පුදුම කළා',
  },
  {
    tcId: 'Neg_Fun_006',
    name: 'Missing space in greeting',
    input: 'subaudeasanak',
    expected: 'සුබ උදෑසනක්',
  },
    {
    tcId: 'Neg_Fun_007',
    name: 'Combined words with numbers',
    input: 'mama keama123 kanawa',
    expected: 'මම කෑම කනවා',
  },
  {
    tcId: 'Neg_Fun_008',
    name: 'Slang + typo',
    input: 'bro eka suparne',
    expected: 'bro ඒක සුපර්නෙ',
  },
   {
    tcId: 'Neg_Fun_010',
    name: 'Extra punctuation',
    input: 'oya??kohedha!!!inne',
    expected: 'ඔයා කොහෙද ඉන්නේ',
  },
  ]
};

// Helper Functions
class TranslatorPagme {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 24000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Minimal Positive & Negative Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });
  
});