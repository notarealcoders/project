interface CodeVersion {
  id: string;
  timestamp: number;
  code: string;
  language: string;
}

export class VersionControl {
  private versions: CodeVersion[] = [];
  private currentIndex: number = -1;

  saveVersion(code: string, language: string) {
    const version: CodeVersion = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      code,
      language,
    };

    // Remove any versions after current index if we're not at the latest version
    if (this.currentIndex < this.versions.length - 1) {
      this.versions = this.versions.slice(0, this.currentIndex + 1);
    }

    this.versions.push(version);
    this.currentIndex = this.versions.length - 1;
    this.persistVersions();
  }

  undo(): CodeVersion | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.versions[this.currentIndex];
    }
    return null;
  }

  redo(): CodeVersion | null {
    if (this.currentIndex < this.versions.length - 1) {
      this.currentIndex++;
      return this.versions[this.currentIndex];
    }
    return null;
  }

  private persistVersions() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('codeVersions', JSON.stringify({
        versions: this.versions,
        currentIndex: this.currentIndex,
      }));
    }
  }

  loadVersions() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('codeVersions');
      if (saved) {
        const { versions, currentIndex } = JSON.parse(saved);
        this.versions = versions;
        this.currentIndex = currentIndex;
      }
    }
  }
}