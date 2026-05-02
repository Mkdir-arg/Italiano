(function () {
  const USERS_KEY = 'italiano.veronica.users';
  const SESSION_KEY = 'italiano.veronica.session';

  const defaultUsers = [
    {
      id: 'super-admin',
      name: 'Veronica Admin',
      email: 'admin@veronica-italiano.com',
      password: 'veronica2026',
      role: 'superadmin'
    },
    {
      id: 'student-demo',
      name: 'Alumno Demo',
      email: 'alumna@veronica-italiano.com',
      password: 'ciaoitalia',
      role: 'student'
    }
  ];

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function safeRead(key, fallback) {
    try {
      const rawValue = localStorage.getItem(key);
      return rawValue ? JSON.parse(rawValue) : fallback;
    } catch {
      return fallback;
    }
  }

  function safeWrite(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function ensureUsers() {
    const existingUsers = safeRead(USERS_KEY, []);
    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return existingUsers;
    }

    safeWrite(USERS_KEY, defaultUsers);
    return defaultUsers.slice();
  }

  function listUsers() {
    return ensureUsers().map(({ password, ...user }) => user);
  }

  function getSession() {
    return safeRead(SESSION_KEY, null);
  }

  function isAuthenticated() {
    return Boolean(getSession());
  }

  function isSuperAdmin() {
    const session = getSession();
    return Boolean(session && session.role === 'superadmin');
  }

  function login(email, password) {
    const normalizedEmail = normalizeEmail(email);
    const users = ensureUsers();
    const matchedUser = users.find(
      (user) => user.email === normalizedEmail && user.password === String(password || '')
    );

    if (!matchedUser) {
      return {
        ok: false,
        message: 'Credenciales incorrectas. Usá uno de los accesos demo habilitados.'
      };
    }

    const session = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role
    };

    safeWrite(SESSION_KEY, session);

    return {
      ok: true,
      session
    };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function createUser(userData) {
    const session = getSession();
    if (!session || session.role !== 'superadmin') {
      return {
        ok: false,
        message: 'Solo un super admin puede crear nuevos usuarios.'
      };
    }

    const users = ensureUsers();
    const normalizedEmail = normalizeEmail(userData && userData.email);
    if (!normalizedEmail || !userData.password || !userData.name) {
      return {
        ok: false,
        message: 'Faltan nombre, email o contraseña para crear el usuario.'
      };
    }

    if (users.some((user) => user.email === normalizedEmail)) {
      return {
        ok: false,
        message: 'Ya existe un usuario con ese email.'
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: String(userData.name).trim(),
      email: normalizedEmail,
      password: String(userData.password),
      role: userData.role === 'superadmin' ? 'superadmin' : 'student'
    };

    safeWrite(USERS_KEY, users.concat(newUser));

    return {
      ok: true,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    };
  }

  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.replace('index.html');
    }
  }

  function requireSuperAdmin() {
    if (!isAuthenticated()) {
      window.location.replace('index.html');
      return;
    }

    if (!isSuperAdmin()) {
      window.location.replace('home.html');
    }
  }

  function redirectIfAuthenticated() {
    if (isAuthenticated()) {
      window.location.replace('home.html');
    }
  }

  ensureUsers();

  window.ItalianoAuth = {
    demoUsers: listUsers(),
    listUsers,
    getSession,
    isAuthenticated,
    isSuperAdmin,
    login,
    logout,
    createUser,
    requireAuth,
    requireSuperAdmin,
    redirectIfAuthenticated
  };
})();