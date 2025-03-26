using System.Reflection;

namespace DotriStack.AuthCenter.Repository;

public static class AssemblyReference
{
    public static readonly Assembly Assembly = typeof(AssemblyReference).Assembly;
}