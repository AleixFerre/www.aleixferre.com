import type { Project } from '../data/projects';

export function getProjectDuration(project: Project): string {
  const createdAt = project.createdAt;
  const finishedAt = project.finishedAt!;

  let start = new Date(createdAt);
  let end = new Date(finishedAt);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  const days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (months < 0) {
    years--;
    months += 12;
  }

  let result = '';

  if (years > 0) {
    result += `${years} year${years > 1 ? 's' : ''}`;
  }

  if (months > 0 || years === 0) {
    if (result) result += ' and ';
    result += `${months} month${months !== 1 ? 's' : ''}`;
  }

  if (months <= 0 && years <= 0) {
    if (days >= 1 && days <= 3) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    result = 'A week';
  }

  return result;
}
