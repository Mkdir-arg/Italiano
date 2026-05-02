(function () {
  const CATALOG_KEY = 'italiano.veronica.catalog';

  const sectionMeta = {
    pres: { key: 'pres', label: 'Presente', theme: 'pres' },
    pass: { key: 'pass', label: 'Passato', theme: 'pass' },
    fut: { key: 'fut', label: 'Futuro', theme: 'fut' },
    rif: { key: 'rif', label: 'Biblioteca', theme: 'rif' }
  };

  const defaultCatalog = [
    {
      id: 1,
      category: 'pres',
      title: 'Verbi Regolari',
      subtitle: 'Presente',
      description: 'Las 3 conjugaciones con reglas claras, terminaciones completas y notas ortograficas para empezar con buena base.',
      href: 'apuntes/verbi-regolari-presente.html',
      level: 'A1',
      icon: '📐',
      tags: ['-are', '-ere', '-ire']
    },
    {
      id: 2,
      category: 'pres',
      title: 'Irregulares',
      subtitle: '40 verbos clave',
      description: 'Familias de cambio, formas esenciales y traduccion para reconocer los verbos que mas aparecen desde el inicio.',
      href: 'apuntes/verbi-irregolari-presente.html',
      level: 'A1-A2',
      icon: '⚡',
      tags: ['essere', 'avere', 'andare']
    },
    {
      id: 3,
      category: 'pres',
      title: 'Verbi Modali',
      subtitle: 'potere, dovere, volere, sapere',
      description: 'Uso real de los verbos modales, diferencias clave y combinaciones frecuentes para hablar con mas intencion.',
      href: 'apuntes/verbi-modali.html',
      level: 'A1-A2',
      icon: '🎯',
      tags: ['uso', 'matices', 'frecuentes']
    },
    {
      id: 4,
      category: 'pres',
      title: 'Riflessivi',
      subtitle: 'reciprocos y fraseologicos',
      description: 'Rutinas, pronombres y expresiones como cominciare a o smettere di para ampliar tu forma de decir acciones.',
      href: 'apuntes/verbi-riflessivi.html',
      level: 'A2',
      icon: '🔄',
      tags: ['rutina', 'pronomi', 'fraseologici']
    },
    {
      id: 5,
      category: 'pass',
      title: 'Passato Prossimo',
      subtitle: 'Guia completa',
      description: 'Estructura, eleccion entre avere y essere, acuerdo del participio y reglas que suelen generar dudas al principio.',
      href: 'apuntes/passato-prossimo-completo.html',
      level: 'A1-A2',
      icon: '📚',
      tags: ['avere', 'essere', 'estructura']
    },
    {
      id: 6,
      category: 'pass',
      title: 'Participi Irregolari',
      subtitle: 'familias frecuentes',
      description: 'Un recorrido ordenado por los participios mas usados para reconocer patrones y memorizar mejor.',
      href: 'apuntes/passato-prossimo-irregolari.html',
      level: 'A2',
      icon: '🧩',
      tags: ['fatto', 'detto', 'scritto']
    },
    {
      id: 7,
      category: 'pass',
      title: 'Tabla de 50 verbos',
      subtitle: 'Passato prossimo',
      description: 'Una hoja de consulta rapida para repasar los verbos mas usados y revisar auxiliares sin perder tiempo.',
      href: 'apuntes/passato-prossimo-tabella.html',
      level: 'A1-A2',
      icon: '📊',
      tags: ['50 verbos', 'repaso', 'tabla']
    },
    {
      id: 8,
      category: 'pass',
      title: 'Imperfetto',
      subtitle: 'criterio de uso',
      description: 'Habitos, descripciones, acciones en curso y contraste con passato prossimo para decidir mejor que usar.',
      href: 'apuntes/imperfetto.html',
      level: 'A2',
      icon: '⏳',
      tags: ['habitos', 'descripcion', 'contraste']
    },
    {
      id: 9,
      category: 'fut',
      title: 'Futuro Semplice',
      subtitle: 'forma y usos',
      description: 'Formacion, irregulares y usos como prediccion, intencion y futuro epistemico en una sola guia.',
      href: 'apuntes/futuro-semplice.html',
      level: 'A2-B1',
      icon: '🚀',
      tags: ['planes', 'reglas', 'quando/se']
    },
    {
      id: 10,
      category: 'rif',
      title: '50 Verbi',
      subtitle: 'todas las conjugaciones',
      description: 'Una coleccion de verbos en varios tiempos para estudiar patrones y repasar rapidamente antes de practicar.',
      href: 'apuntes/50-verbi-coniugazioni.html',
      level: 'A1-B1',
      icon: '📋',
      tags: ['coleccion', 'conjugaciones', 'consulta']
    },
    {
      id: 11,
      category: 'rif',
      title: 'Riassunto dei Tempi',
      subtitle: 'vision general',
      description: 'El mapa completo de tiempos para ordenar conceptos, detectar diferencias y decidir que repasar primero.',
      href: 'apuntes/riassunto-tempi.html',
      level: 'A1-B1',
      icon: '🗺️',
      tags: ['resumen', 'mapa', 'decision']
    }
  ];

  function safeReadCatalog() {
    try {
      const rawValue = localStorage.getItem(CATALOG_KEY);
      return rawValue ? JSON.parse(rawValue) : null;
    } catch {
      return null;
    }
  }

  function safeWriteCatalog(value) {
    localStorage.setItem(CATALOG_KEY, JSON.stringify(value));
  }

  function ensureCatalog() {
    const currentCatalog = safeReadCatalog();
    if (Array.isArray(currentCatalog) && currentCatalog.length > 0) {
      return currentCatalog;
    }

    safeWriteCatalog(defaultCatalog);
    return defaultCatalog.slice();
  }

  function isValidContentHref(href) {
    return /^(https?:\/\/|(?:\.\/|\.\.\/)?[a-z0-9/_-]+\.html?)$/i.test(String(href || '').trim());
  }

  function list() {
    return ensureCatalog().slice();
  }

  function stats() {
    const items = list();
    const categorySet = new Set(items.map((item) => item.category));
    return {
      totalTopics: items.length,
      categories: categorySet.size,
      totalSections: Object.keys(sectionMeta).length
    };
  }

  function grouped() {
    const items = list();
    return Object.keys(sectionMeta).map((key) => ({
      ...sectionMeta[key],
      items: items.filter((item) => item.category === key)
    }));
  }

  function addContent(contentData) {
    if (!window.ItalianoAuth || !window.ItalianoAuth.isSuperAdmin()) {
      return {
        ok: false,
        message: 'Solo un super admin puede dar de alta contenido nuevo.'
      };
    }

    const items = ensureCatalog();
    const nextItem = {
      id: Date.now(),
      category: sectionMeta[contentData.category] ? contentData.category : 'rif',
      title: String(contentData.title || '').trim(),
      subtitle: String(contentData.subtitle || '').trim(),
      description: String(contentData.description || '').trim(),
      href: String(contentData.href || '').trim(),
      level: String(contentData.level || 'A1').trim(),
      icon: String(contentData.icon || '📄').trim(),
      tags: Array.isArray(contentData.tags) ? contentData.tags.slice(0, 4) : []
    };

    if (!nextItem.title || !nextItem.href) {
      return {
        ok: false,
        message: 'Para agregar contenido nuevo hacen falta al menos titulo y href.'
      };
    }

    if (!isValidContentHref(nextItem.href)) {
      return {
        ok: false,
        message: 'El contenido nuevo debe apuntar a un archivo HTML local o a una URL http/https valida.'
      };
    }

    const updatedItems = items.concat(nextItem);
    safeWriteCatalog(updatedItems);

    return {
      ok: true,
      item: nextItem
    };
  }

  function reset() {
    safeWriteCatalog(defaultCatalog);
  }

  ensureCatalog();

  window.ItalianoCatalog = {
    sectionMeta,
    list,
    grouped,
    stats,
    addContent,
    reset
  };
})();