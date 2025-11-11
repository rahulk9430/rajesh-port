import { Pipe, PipeTransform } from '@angular/core';
import { ServiceItem } from 'src/app/models/service.model';

@Pipe({ name: 'mapTags' })
export class MapTagsPipe implements PipeTransform {
  transform(services: ServiceItem[] | null | undefined): string[] {
    if (!services || !services.length) return [];
    const set = new Set<string>();
    services.forEach(s => (s.tags || []).forEach(t => set.add(t)));
    return Array.from(set);
  }
}
