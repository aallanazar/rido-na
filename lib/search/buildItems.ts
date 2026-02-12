import { curriculum, getLocalized } from '@/lib/curriculum';
import type { LanguageCode, LevelId, ModuleSectionType, SubjectId } from '@/lib/curriculum/types';
import type { SearchItem } from './types';
import { buildCodingCourse, getCodingCourseIds } from '@/lib/courses/coding';
import { buildOfficeCourse } from '@/lib/courses/office';
import { ls } from '@/lib/courses/helpers';

const sectionOrder: ModuleSectionType[] = ['theory', 'examples', 'exercises', 'visuals', 'quiz', 'worksheets'];

export function buildSearchItems(language: LanguageCode): SearchItem[] {
  const items: SearchItem[] = [];

  (Object.keys(curriculum.subjects) as SubjectId[]).forEach((subjectId) => {
    const subject = curriculum.subjects[subjectId];
    const subjectTitle = getLocalized(language, subject.title);

    items.push({
      id: `subject:${subjectId}`,
      kind: 'subject',
      title: subjectTitle,
      subjectId,
      subjectTitle,
      href: `/platform/${subjectId}`,
      haystack: `${subjectTitle} ${subjectId}`,
    });

    (Object.keys(subject.levels) as LevelId[]).forEach((levelId) => {
      const level = subject.levels[levelId];
      const levelTitle = getLocalized(language, level.title);

      for (const mod of level.modules) {
        const moduleTitle = getLocalized(language, mod.title);
        const moduleDescription = getLocalized(language, mod.description);
        const moduleHref = `/platform/${subjectId}/${levelId}/${mod.id}`;

        items.push({
          id: `module:${subjectId}:${levelId}:${mod.id}`,
          kind: 'module',
          title: moduleTitle,
          snippet: moduleDescription,
          subjectId,
          subjectTitle,
          levelId,
          levelTitle,
          moduleId: mod.id,
          moduleTitle,
          href: moduleHref,
          haystack: `${subjectTitle} ${levelTitle} ${moduleTitle} ${moduleDescription}`,
        });

        const moduleSections = [...mod.sections].sort(
          (a, b) => sectionOrder.indexOf(a.type) - sectionOrder.indexOf(b.type)
        );

        for (const section of moduleSections) {
          const sectionTitle = getLocalized(language, section.title);
          const sectionContent = getLocalized(language, section.content);
          items.push({
            id: `section:${subjectId}:${levelId}:${mod.id}:${section.type}`,
            kind: 'section',
            title: sectionTitle,
            snippet: sectionContent,
            subjectId,
            subjectTitle,
            levelId,
            levelTitle,
            moduleId: mod.id,
            moduleTitle,
            sectionType: section.type,
            href: `${moduleHref}#${section.type}`,
            haystack: `${subjectTitle} ${levelTitle} ${moduleTitle} ${sectionTitle} ${sectionContent}`,
          });
        }

        items.push({
          id: `quiz:${subjectId}:${levelId}:${mod.id}`,
          kind: 'quiz',
          title: getLocalized(language, mod.quizTitle),
          snippet: `${subjectTitle} · ${moduleTitle}`,
          subjectId,
          subjectTitle,
          levelId,
          levelTitle,
          moduleId: mod.id,
          moduleTitle,
          sectionType: 'quiz',
          href: `${moduleHref}#quiz`,
          haystack: `${subjectTitle} ${levelTitle} ${moduleTitle} ${getLocalized(language, mod.quizTitle)} quiz`,
        });

        for (const ws of mod.worksheets) {
          const wsTitle = getLocalized(language, ws.title);
          const wsDescription = ws.description ? getLocalized(language, ws.description) : undefined;
          items.push({
            id: `worksheet:${subjectId}:${levelId}:${mod.id}:${ws.id}`,
            kind: 'worksheet',
            title: wsTitle,
            snippet: wsDescription,
            subjectId,
            subjectTitle,
            levelId,
            levelTitle,
            moduleId: mod.id,
            moduleTitle,
            sectionType: 'worksheets',
            href: `${moduleHref}#worksheets`,
            haystack: `${subjectTitle} ${levelTitle} ${moduleTitle} ${wsTitle} ${wsDescription ?? ''}`.trim(),
          });
        }
      }
    });
  });

  // Coding courses
  const codingSubjectTitle = getLocalized(language, ls('Dasturlash', 'Programmierung', 'Programming'));
  for (const courseId of getCodingCourseIds()) {
    const course = buildCodingCourse(courseId);
    const courseTitle = getLocalized(language, course.title);
    const courseDescription = getLocalized(language, course.description);

    // Add course-level item
    items.push({
      id: `course:coding:${courseId}`,
      kind: 'course',
      title: courseTitle,
      snippet: courseDescription,
      subjectId: 'coding',
      subjectTitle: codingSubjectTitle,
      levelId: courseId,
      levelTitle: courseTitle,
      href: `/platform/coding/${courseId}`,
      haystack: `${codingSubjectTitle} ${courseTitle} ${courseDescription}`,
    });

    for (const m of course.modules) {
      const moduleTitle = getLocalized(language, m.title);
      const moduleDescription = getLocalized(language, m.description);
      const moduleHref = `/platform/coding/${courseId}/${m.index}`;

      // Add all section content to haystack for better indexing
      const sectionTexts = m.sections
        .map(s => {
          const sectionTitle = getLocalized(language, s.title);
          const sectionContent = getLocalized(language, s.content);
          return `${sectionTitle} ${sectionContent}`;
        })
        .join(' ');

      items.push({
        id: `codingModule:${courseId}:${m.index}`,
        kind: 'module',
        title: moduleTitle,
        snippet: moduleDescription,
        subjectId: 'coding',
        subjectTitle: codingSubjectTitle,
        levelId: courseId,
        levelTitle: courseTitle,
        moduleId: String(m.index),
        moduleTitle,
        href: moduleHref,
        haystack: `${codingSubjectTitle} ${courseTitle} ${moduleTitle} ${moduleDescription} ${sectionTexts}`,
      });

      for (const s of m.sections) {
        const sectionTitle = getLocalized(language, s.title);
        const sectionContent = getLocalized(language, s.content);
        items.push({
          id: `codingSection:${courseId}:${m.index}:${s.type}`,
          kind: 'section',
          title: sectionTitle,
          snippet: sectionContent,
          subjectId: 'coding',
          subjectTitle: codingSubjectTitle,
          levelId: courseId,
          levelTitle: courseTitle,
          moduleId: String(m.index),
          moduleTitle,
          sectionType: s.type,
          href: `${moduleHref}#${s.type}`,
          haystack: `${codingSubjectTitle} ${courseTitle} ${moduleTitle} ${sectionTitle} ${sectionContent}`,
        });
      }

      items.push({
        id: `codingQuiz:${courseId}:${m.index}`,
        kind: 'quiz',
        title: getLocalized(language, m.quizTitle),
        snippet: `${courseTitle} · ${moduleTitle}`,
        subjectId: 'coding',
        subjectTitle: codingSubjectTitle,
        levelId: courseId,
        levelTitle: courseTitle,
        moduleId: String(m.index),
        moduleTitle,
        sectionType: 'quiz',
        href: `${moduleHref}#quiz`,
        haystack: `${codingSubjectTitle} ${courseTitle} ${moduleTitle} ${getLocalized(language, m.quizTitle)} quiz`,
      });

      items.push({
        id: `codingHomework:${courseId}:${m.index}`,
        kind: 'homework',
        title: getLocalized(language, ls('Uy vazifalari', 'Hausaufgaben', 'Homeworks')),
        snippet: `${courseTitle} · ${moduleTitle}`,
        subjectId: 'coding',
        subjectTitle: codingSubjectTitle,
        levelId: courseId,
        levelTitle: courseTitle,
        moduleId: String(m.index),
        moduleTitle,
        sectionType: 'homework',
        href: `${moduleHref}#homework`,
        haystack: `${codingSubjectTitle} ${courseTitle} ${moduleTitle} homework`,
      });

      items.push({
        id: `codingMaterials:${courseId}:${m.index}`,
        kind: 'material',
        title: getLocalized(language, ls('Materiallar', 'Material', 'Materials')),
        snippet: `${courseTitle} · ${moduleTitle}`,
        subjectId: 'coding',
        subjectTitle: codingSubjectTitle,
        levelId: courseId,
        levelTitle: courseTitle,
        moduleId: String(m.index),
        moduleTitle,
        sectionType: 'materials',
        href: `${moduleHref}#materials`,
        haystack: `${codingSubjectTitle} ${courseTitle} ${moduleTitle} materials`,
      });
    }
  }

  // Microsoft Office course
  const officeSubjectTitle = getLocalized(language, ls('Microsoft Office', 'Microsoft Office', 'Microsoft Office'));
  const officeCourse = buildOfficeCourse();
  const officeCourseTitle = getLocalized(language, officeCourse.title);
  const officeCourseDescription = getLocalized(language, officeCourse.description);

  items.push({
    id: `course:office:microsoft-office`,
    kind: 'course',
    title: officeCourseTitle,
    snippet: officeCourseDescription,
    subjectId: 'office',
    subjectTitle: officeSubjectTitle,
    levelId: 'microsoft-office',
    levelTitle: officeCourseTitle,
    href: `/platform/office`,
    haystack: `${officeSubjectTitle} ${officeCourseTitle} ${officeCourseDescription}`,
  });

  for (const m of officeCourse.modules) {
    const moduleTitle = getLocalized(language, m.title);
    const moduleDescription = getLocalized(language, m.description);
    const moduleHref = `/platform/office/${m.index}`;

    items.push({
      id: `officeModule:${m.index}`,
      kind: 'module',
      title: moduleTitle,
      snippet: moduleDescription,
      subjectId: 'office',
      subjectTitle: officeSubjectTitle,
      levelId: 'microsoft-office',
      levelTitle: officeCourseTitle,
      moduleId: String(m.index),
      moduleTitle,
      href: moduleHref,
      haystack: `${officeSubjectTitle} ${officeCourseTitle} ${moduleTitle} ${moduleDescription}`,
    });

    for (const s of m.sections) {
      const sectionTitle = getLocalized(language, s.title);
      const sectionContent = getLocalized(language, s.content);
      items.push({
        id: `officeSection:${m.index}:${s.type}`,
        kind: 'section',
        title: sectionTitle,
        snippet: sectionContent,
        subjectId: 'office',
        subjectTitle: officeSubjectTitle,
        levelId: 'microsoft-office',
        levelTitle: officeCourseTitle,
        moduleId: String(m.index),
        moduleTitle,
        sectionType: s.type,
        href: `${moduleHref}#${s.type}`,
        haystack: `${officeSubjectTitle} ${officeCourseTitle} ${moduleTitle} ${sectionTitle} ${sectionContent}`,
      });
    }

    items.push({
      id: `officeQuiz:${m.index}`,
      kind: 'quiz',
      title: getLocalized(language, m.quizTitle),
      snippet: `${officeCourseTitle} · ${moduleTitle}`,
      subjectId: 'office',
      subjectTitle: officeSubjectTitle,
      levelId: 'microsoft-office',
      levelTitle: officeCourseTitle,
      moduleId: String(m.index),
      moduleTitle,
      sectionType: 'quiz',
      href: `${moduleHref}#quiz`,
      haystack: `${officeSubjectTitle} ${officeCourseTitle} ${moduleTitle} ${getLocalized(language, m.quizTitle)} quiz`,
    });
  }

  return items;
}
