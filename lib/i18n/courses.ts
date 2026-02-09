export type CourseContent = {
    title: string;
    description: string;
    vocabulary: { word: string; translation: string; pronunciation: string }[];
    grammar: { title: string; content: string };
};

export const languageCourses: Record<string, Record<string, CourseContent>> = {
    en: { // Target Language: English
        uz: {
            title: "Ingliz tili asoslari",
            description: "Ingliz tili dunyosiga o'zbek tilidagi tushuntirishlar bilan qadam qo'ying.",
            vocabulary: [
                { word: "Hello", translation: "Salom", pronunciation: "/həˈloʊ/" },
                { word: "Book", translation: "Kitob", pronunciation: "/bʊk/" },
                { word: "Learn", translation: "O'rganmoq", pronunciation: "/lɜːrn/" }
            ],
            grammar: {
                title: "Sodda hozirgi zamon",
                content: "Present Simple - bu odatiy harakatlar uchun ishlatiladi..."
            }
        },
        de: {
            title: "Englisch Grundlagen",
            description: "Beginne deine Reise ins Englische mit Erklärungen auf Deutsch.",
            vocabulary: [
                { word: "Hello", translation: "Hallo", pronunciation: "/həˈloʊ/" },
                { word: "Book", translation: "Buch", pronunciation: "/bʊk/" },
                { word: "Learn", translation: "Lernen", pronunciation: "/lɜːrn/" }
            ],
            grammar: {
                title: "Simple Present",
                content: "Das Simple Present wird für gewohnheitsmäßige Handlungen verwendet..."
            }
        },
        en: {
            title: "English Essentials",
            description: "Master the basics of English with English instructions.",
            vocabulary: [
                { word: "Hello", translation: "Greeting", pronunciation: "/həˈloʊ/" },
                { word: "Book", translation: "Reading material", pronunciation: "/bʊk/" },
                { word: "Learn", translation: "Gain knowledge", pronunciation: "/lɜːrn/" }
            ],
            grammar: {
                title: "Present Simple",
                content: "The Present Simple is used for habitual actions..."
            }
        }
    },
    de: { // Target Language: German
        uz: {
            title: "Nemis tili asoslari",
            description: "Nemis tilini o'zbek tilidagi tushuntirishlar bilan o'rganing.",
            vocabulary: [
                { word: "Hallo", translation: "Salom", pronunciation: "/ˈhaloː/" },
                { word: "Buch", translation: "Kitob", pronunciation: "/buːx/" },
                { word: "Lernen", translation: "O'rganmoq", pronunciation: "/ˈlɛrnən/" }
            ],
            grammar: {
                title: "Artikllar",
                content: "Nemis tilida uch xil artikl mavjud: der, die, das..."
            }
        },
        en: {
            title: "German Basics",
            description: "Learn German with instructions in English.",
            vocabulary: [
                { word: "Hallo", translation: "Hello", pronunciation: "/ˈhaloː/" },
                { word: "Buch", translation: "Book", pronunciation: "/buːx/" },
                { word: "Lernen", translation: "To learn", pronunciation: "/ˈlɛrnən/" }
            ],
            grammar: {
                title: "Articles",
                content: "In German, there are three types of articles: der, die, das..."
            }
        },
        de: {
            title: "Deutsch Grundlagen",
            description: "Lerne Deutsch mit Erklärungen auf Deutsch.",
            vocabulary: [
                { word: "Hallo", translation: "Begrüßung", pronunciation: "/ˈhaloː/" },
                { word: "Buch", translation: "Lesestoff", pronunciation: "/buːx/" },
                { word: "Lernen", translation: "Wissen erwerben", pronunciation: "/ˈlɛrnən/" }
            ],
            grammar: {
                title: "Artikel",
                content: "Im Deutschen gibt es drei Artikel: der, die, das..."
            }
        }
    }
};
